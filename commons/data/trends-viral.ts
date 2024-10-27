type data = {
  id: number;
  image: any;
  userImage: string;
  user: string;
  text: string;
  views?: string;
  likes?: string;
  shares?: string;
};

const trendViral: data[] = [
  {
    id: 1,
    image: require("../../assets/images/viral-1.png"),
    userImage: require("../../assets/images/t5.png"),
    user: "Jesse Wattson",
    text: "Excepteur sint occaet sint proido cupidatat proido",
    views: "58.6k",
    likes: "12k",
    shares: "5k",
  },
];

export default trendViral;
