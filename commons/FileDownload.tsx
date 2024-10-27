import { isAndroid } from '@/constants/Window';
import * as FileSystem from 'expo-file-system';
import * as ExpoShare from 'expo-sharing'
const { StorageAccessFramework } = FileSystem;


const ensureDirExists = async (dir: string, intermediates = true) => {
  const { exists, isDirectory, uri } = await FileSystem.getInfoAsync(dir);
  if (exists && isDirectory) {
    return {
      isReady: true,
      uri
    };
  }
  await FileSystem.makeDirectoryAsync(dir, { intermediates });

  const props = await FileSystem.getInfoAsync(dir);
  if (props.exists && props.isDirectory) {
    return {
      isReady: true,
      uri: props.uri
    };
  }
  return {
    isReady: false,
  };
}

export const saveRemoteFile = async ({ uri, downlaodToDirectory, filename, filetype }: {
  uri: string; downlaodToDirectory: string;
  filename: string; filetype: MimeTypes
}) => {
  let directoryStatus: {
    isReady: boolean;
    uri?: string;
  } = {
    isReady: true
  }

  if (isAndroid) {
    try {
      directoryStatus = await ensureDirExists(downlaodToDirectory)
    } catch (error) {
      return {
        saved: false
      }
    }
  }

  if (!directoryStatus.isReady) {
    return {
      saved: false
    }
  }

  const downloadResumable = FileSystem.createDownloadResumable(
    uri,
    `${downlaodToDirectory}${filename}`,
    {},
    (progress) => {
      console.log('Progress: ');
      console.log(progress);


    }
  )

  try {

    const downloader = await downloadResumable.downloadAsync();

    if ((downloader as any).uri) {
      if (isAndroid) {
        return await saveAndroidFile({
          fileName: filename,
          fileUri: (downloader as any).uri,
          fileType: filetype
        })
      } else {
        return await saveIosFile({
          fileName: filename,
          fileUri: (downloader as any).uri,
          fileType: filetype
        });
      }
    } else {
      throw new Error('Download was cancelled')
    }

  } catch (error) {
    return {
      saved: false
    }
  }


}

type MimeTypes = 'application/pdf' | 'image/jpg' | 'image/jpeg' | 'image/png' | 'video/mp4'

const saveAndroidFile = async ({ fileName, fileUri, fileType }: { fileUri: string, fileName: string; fileType: MimeTypes }) => {

  try {
    const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {

      return;
    }
    const fileURI = await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, fileType);
    await FileSystem.writeAsStringAsync(fileURI, fileString, { encoding: FileSystem.EncodingType.Base64 });

    return {
      saved: true,
      savedTo: fileURI
    }

  } catch (err) {
    return {
      saved: false,
    }
  }
}

const saveIosFile = async ({ fileName, fileUri, fileType }: { fileUri: string, fileName: string; fileType: MimeTypes }) => {
  // your ios code
  // i use expo share module to save ios file
  try {
    await ExpoShare.shareAsync(
      fileUri,
      {
        UTI: 'public.content', // 'public.item'
        dialogTitle: '',
        mimeType: ''
      }
    )
  } catch (error) {
    return {
      saved: false
    }
  }
  return {
    saved: true
  }
}