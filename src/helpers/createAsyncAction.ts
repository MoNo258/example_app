import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalState, ReduxDispatch } from "../redux";

type ThunkApiConfig = {
  dispatch: ReduxDispatch;
  state: GlobalState;
};

export const createAsyncAction = <Returned = void, Args = void>(
  type: string,
  action: AsyncThunkPayloadCreator<Returned, Args, ThunkApiConfig>
) => createAsyncThunk<Returned, Args, ThunkApiConfig>(type, action);
