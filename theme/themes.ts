export const Theme: { light: ThemeColors; dark: ThemeColors; mode: ThemeMode } =
  {
    mode: "dark",
    light: {
      primary: "rgb(247, 82, 17)",
      lightPrimary: "rgba(247, 82, 17, 0.13)",
      secondary: "#F92F40",
      secBg: "#FDE9E0",
      light: "#ffffff",
      white: "#ffffff",
      background: "#ffffff",
      dark: "#000000",
      gray0: "#E3E3E3",
      gray1: "#707070",
      gray2: "#707070",
      link: "#F92F40",
      icon: "#939393",
    },
    dark: {
      primary: "rgb(247, 82, 17)",
      lightPrimary: "rgba(247, 82, 17, 0.23)",
      secondary: "#F92F40",
      secBg: "#FDE9E0",
      light: "#010039",
      white: "#010039",
      background: "#010039",
      dark: "#ffffff",
      gray0: "#212054",
      gray1: "#ffffff",
      gray2: "#62628b",
      link: "rgb(247, 82, 17)",
      icon: "#939393",
    },
  };

export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  primary: string;
  lightPrimary: string;
  secondary: string;
  light: string;
  white: string;
  secBg: string;
  background: string;
  dark: string;
  gray0: string;
  gray1: string;
  gray2: string;
  link: string;
  icon: string;
};
