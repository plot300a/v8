import { createSlice } from "@reduxjs/toolkit";

type PayType = {
  cardCredit: string;
  amount: number;
  date: string;
  time: string;
};
const paymentSlice = createSlice({
  name: "pay",
  initialState: {
    cardCredit: "",
    amount: null,
    date: null,
    time: null,
  },
  reducers: {
    updatePayment(
      state: any,
      { payload }: { payload: { [K in keyof PayType]?: PayType[K] } }
    ) {
      let key: keyof PayType;
      for (key in payload) {
        (state as any)[key as any] = payload[key];
      }
    },
  },
});

export const { updatePayment } = paymentSlice.actions;
export default paymentSlice.reducer;
