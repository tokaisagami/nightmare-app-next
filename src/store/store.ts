import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import loadingReducer from './slices/loadingSlice';
import registerReducer from './slices/registerSlice'; // 新規登録用のスライスをインポート

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
    register: registerReducer, // 新規登録用のリデューサーを追加
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
