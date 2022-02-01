import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncAction } from "src/helpers";
import { getUsersOrganizations } from "../../Api";

export const initialState: IUsersOrgsSlice = {
  items: [],
  loading: true
};

// const fetchOrganizations = createAsyncThunk<
//   IUsersOrgs[],
//   string,
//   {
//     rejectValue: string; // error type can be corrected FIXME:
//   }
// >(
//   "request-Orgs/fetchOrganizations",
//   async (login: string, { rejectWithValue }) => {
//     try {
//       const response = await getUsersOrganizations(login);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error as string); //error type can be corrected FIXME:
//     }
//   }
// );

const fetchOrganizations = createAsyncAction(
  "request-Orgs/fetchOrganizations",
  async (login: string, { rejectWithValue }) => {
    try {
      const response = await getUsersOrganizations(login);
      return response;
    } catch (error) {
      return rejectWithValue(error as string); //error type can be corrected FIXME:
    }
  }
);
const slice = createSlice({
  name: "request-Orgs",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IUsersOrgsSlice["items"]>) => {
      state.items = action.payload;
    },
    setLoading: (
      state,
      { payload }: PayloadAction<IUsersOrgsSlice["loading"]>
    ) => {
      state.loading = payload;
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchOrganizations.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchOrganizations.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    });
    builder.addCase(fetchOrganizations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export default slice.reducer;

export const UsersOrganizationsAction = {
  ...slice.actions,
  fetchOrganizations
};
