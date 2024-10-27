import React from "react";

type data = {
  id: number;
  icon: any;
  song: any;
  size: string;
  isChecked?: boolean;
};

const audioData: data[] = [
  {
    id: 1,
    icon: require("../../../assets/images/audio.png"),
    song: "Excepteur sint occaet.mp3",
    size: "3.5MB",
    isChecked: true,
  },
  {
    id: 2,
    icon: require("../../../assets/images/audio.png"),
    song: "Excepteur sint occaet.mp3",
    size: "3.5MB",
    isChecked: true,
  },
  {
    id: 3,
    icon: require("../../../assets/images/audio.png"),
    song: "Excepteur sint occaet.mp3",
    size: "8.5MB",
    isChecked: false,
  },
  {
    id: 4,
    icon: require("../../../assets/images/audio.png"),
    song: "Excepteur sint occaet.mp3 ",
    size: "3.5MB",
    isChecked: true,
  },
];

export default audioData;
