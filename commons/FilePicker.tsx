
import { Button, SafeAreaView, } from 'react-native';
import * as MediaLibrary from 'expo-media-library';


import * as FileSystem from 'expo-file-system';
import { saveRemoteFile } from "@/commons/FileDownload";

export default function FileDownloadTest(){

  const saveFile = async ()=>{
    const res = saveRemoteFile({
      uri: 'https://dummyimage.com/250/ffffff/000000',//'http://techslides.com/demos/sample-videos/small.mp4',
      downlaodToDirectory: FileSystem.documentDirectory as string,
      filename: 'small.png',
      filetype: 'image/png'
    })
  }

  return (
    <SafeAreaView>
         <Button onPress={saveFile} title="Save File" />
    </SafeAreaView>
  )
}
type MediaPermissions = [
  MediaLibrary.PermissionResponse | null, 
  () => Promise<MediaLibrary.PermissionResponse>, () => Promise<MediaLibrary.PermissionResponse>
]
async function getMediaAlbumContent(permissions: MediaPermissions): Promise<{
  content: MediaLibrary.Album[];
  permissionsDenied: false;
  grantedAccess: "all" | "limited" | undefined;
}|{
  content: null;
  permissionsDenied: true;
  grantedAccess: "none" | undefined;
}>{
  const [permissionResponse, requestPermission] = permissions;
  
  let accessPrivileges = permissionResponse?.accessPrivileges;
  // if(ignore){
  //   return {
  //     content: null,
  //     permissionsDenied: true,
  //     grantedAccess: accessPrivileges as undefined
  //   }
  // }
  if (permissionResponse&&(!permissionResponse.granted||accessPrivileges === 'none')) {
    if(permissionResponse.canAskAgain){
      let response: MediaLibrary.PermissionResponse; 
      try {
        response = await requestPermission();
      } catch (error) {
        
        return {
          content: null,
          permissionsDenied: true,
          grantedAccess: 'none'
        }
      }
      accessPrivileges = response.accessPrivileges;
      if(!response.granted||response.accessPrivileges === 'none'){
        return {
          content: null,
          permissionsDenied: true,
          grantedAccess: 'none'
        }
      }
    }else{
      return {
        content: null,
        permissionsDenied: true,
        grantedAccess: 'none'
      }
    }
  }
  let content: MediaLibrary.Album[]; 
  try {
    content = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: !false,
    })
  } catch (error) {
    return {
      content: null,
      permissionsDenied: true,
      grantedAccess: 'none'
    }
  }
  return {
    content: content,
    permissionsDenied: false,
    grantedAccess: accessPrivileges
  } as any;
}

export function useMediaPermissions(){
  return MediaLibrary.usePermissions();
}

type MediaType = 'audio'|'image'|'video'|'image-video'|'image-video-audio'|'image-audio'|'audio-video'|'others'|'all';
type MediaContentProps = {
  /** The type of content to get from the media library */
  type: MediaType;
  /** Maximum items to read from the media library */
  maximum: number;
  /** Permissions array */
  permissions:MediaPermissions
}

export async function getMediaContent({type,maximum,permissions}:MediaContentProps): Promise<{
  content: (MediaLibrary.Asset&{albumTitle: string})[];
  permissionsDenied: false;
  grantedAccess: "all" | "limited" | undefined;
}|{
  content: null;
  permissionsDenied: true;
  grantedAccess: "none" | undefined;
}> {
  const MAX = ++maximum;
  let contentTypes: MediaLibrary.MediaTypeValue[]|undefined = [];
  switch (type) {
    case 'all':
      contentTypes = undefined;
      break;
    case 'image-video-audio':
      contentTypes = ['audio','photo','video'];
      break;
    case 'image-video':
      contentTypes = ['photo','video'];
      break;
    case 'image-audio':
      contentTypes = ['audio','photo'];
      break;
    case 'audio-video':
      contentTypes = ['audio','video'];
      break;
    case 'image':
      contentTypes = ['photo'];
      break;
    case 'audio':
      contentTypes = ['audio'];
      break;
    case 'video':
      contentTypes = ['video'];
      break;
    default: // 'others'
    contentTypes = ['unknown'];
  }

  const albums = await getMediaAlbumContent(permissions);
 
  if(!albums.content){
    return {
        content: null,
        permissionsDenied: albums.permissionsDenied,
        grantedAccess: albums.grantedAccess
    };
  }

  let allContents: MediaLibrary.Asset[] = [];
  let albumAsset: MediaLibrary.PagedInfo<MediaLibrary.Asset>;
  let album:MediaLibrary.Album;
  
  for(let i = 0, l = albums.content.length; i < l; i++){
    if(albums.content[i].title.toLowerCase()==='recents'){
      albums.content = [albums.content[i],...albums.content.slice(0,i),...albums.content.slice(i+1)];
      break;
    }
  }
 
  async function firstLoop(album: MediaLibrary.Album){
      albumAsset =  await MediaLibrary.getAssetsAsync({
        album: album, 
        mediaType: contentTypes, 
        sortBy: 'default',
        first: maximum,
        after: albumAsset.endCursor,
      });
      allContents = [...allContents,...(albumAsset.assets.map((asset)=>{
        (asset as any).albumTitle = album.title;
        return asset;
      }))];
      if(albumAsset.hasNextPage&&allContents.length<MAX){
        maximum = MAX - allContents.length;
        await firstLoop(album)
      }
  }
  let loopCursor = 0;
  async function awaitLoop(){
    albumAsset = {hasNextPage:true,endCursor:undefined} as any; // Reset album asset variable
    await firstLoop( (albums.content as NonNullable<typeof albums.content>)[loopCursor++]);
    if(allContents.length<MAX&&loopCursor<(albums.content as NonNullable<typeof albums.content>).length){
      maximum = MAX - allContents.length;
      await awaitLoop();
    }
  }

  try {
    await awaitLoop();
  } catch (error) {
    return {
      content: null,
      permissionsDenied: albums.permissionsDenied,
      grantedAccess: albums.grantedAccess
    } as any;
  }
  return {
    content: allContents.slice(0,maximum-1).sort(({creationTime:first},{creationTime:second})=>{
      return second-first
    },),
    permissionsDenied: false,
    grantedAccess: albums.grantedAccess,
  } as any
}