import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

type AuthType = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;

  userToken: boolean;
  logout: boolean;
  uid: string;
  profilePhoto: string;
  userInfo: DocumentData;
  toggle: boolean;
  emailError: string;
  passwordError: string;
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",

    userToken: false,
    logout: false,
    uid: "",
    profilePhoto: "",
    userInfo: null,
    toggle: true,
    emailError: "",
    passwordError: "",
  },
  reducers: {
    updateAuth(
      state: any,
      { payload }: { payload: { [K in keyof AuthType]?: AuthType[K] } }
    ) {
      let key: keyof AuthType;
      for (key in payload) {
        (state as any)[key as any] = payload[key];
      }
    },
  },
});

export const { updateAuth } = authSlice.actions;
export default authSlice.reducer;
