import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import driverReducer from '../features/driver/driverSlice';
import loadReducer from '../features/load/loadSlice';
import expenseReducer from '../features/expense/expenseSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    drivers: driverReducer,
    loads: loadReducer,
    expenses: expenseReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>>;
