import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncAction } from "src/helpers";
import { getUsers } from "../../Api";

export const initialState: IUsersSlice = {
  usersArray: [],
  loading: true
};

const fetchUsers = createAsyncAction("request-Users/fetchUsers", async () => {
  try {
    const response = await getUsers();
    return response;
  } catch (error) {
    return console.log(error); //error type can be corrected FIXME:
  }
});
const slice = createSlice({
  name: "request-Users",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IUsersSlice["usersArray"]>) => {
      state.usersArray = action.payload;
    },
    setLoading: (state, { payload }: PayloadAction<IUsersSlice["loading"]>) => {
      state.loading = payload;
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.usersArray = payload as IUser[];
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export default slice.reducer;

export const UsersListAction = {
  ...slice.actions,
  fetchUsers
};
