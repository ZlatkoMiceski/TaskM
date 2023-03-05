import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import cityReducer from '../features/cities/city-slice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    city: cityReducer,
  },
});
