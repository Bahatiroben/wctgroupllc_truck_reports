import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { createLoadAPI, getLoadsAPI, updateLoadAPI, deleteLoadAPI, getLoadByDriverId } from './loadApi';
import { ILoad, IUpdateLoad } from './interfaces';

export interface ILoadState {
  value: ILoad[];
  status: 'idle' | 'loading' | 'failed';
}

interface IUpdateLoadThunk extends  IUpdateLoad{
  _id?: string;
}
const initialState: ILoadState = {
  value: [],
  status: 'idle',
};

export const createLoad = createAsyncThunk(
  'load/createLoad',
  async (LoadDetails: ILoad) => {
    const response = await createLoadAPI(LoadDetails);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const deleteLoad = createAsyncThunk(
  'load/deleteLoad',
  async (loadId: string) => {
    const response = await deleteLoadAPI(loadId);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateLoad = createAsyncThunk(
  'load/updateLoad',
  async (loadDetails: IUpdateLoadThunk) => {
    const response = await updateLoadAPI(loadDetails, loadDetails._id as string);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getLoadsByDriver = createAsyncThunk(
  'load/getLoads',
  async (args: {driverId: string; params: {max: Date, min: Date}}) => {
    const response = await getLoadByDriverId(args.driverId, args.params);
    return response
  }
);

export const LoadSlice = createSlice({
  name: 'loads',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getLoadsByDriver.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLoadsByDriver.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getLoadsByDriver.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const { createLoads } = LoadSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
export const selectLoads = (state: RootState) => state.loads.value;

export default LoadSlice.reducer;
