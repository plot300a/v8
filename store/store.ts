import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slice/auth'
import PaymentReducer from './slice/pay'


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    pay: PaymentReducer,
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

