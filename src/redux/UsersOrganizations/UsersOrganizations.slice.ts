import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsersOrganizations } from "../../Api";

export const initialState: IUsersOrgsSlice = {
  items: [],
  loading: true

  //   login: "toml-lang",
  // id: 7966854,
  // node_id: "MDEyOk9yZ2FuaXphdGlvbjc5NjY4NTQ=",
  // url: "https://api.github.com/orgs/toml-lang",
  // repos_url: "https://api.github.com/orgs/toml-lang/repos",
  // events_url: "https://api.github.com/orgs/toml-lang/events",
  // hooks_url: "https://api.github.com/orgs/toml-lang/hooks",
  // issues_url: "https://api.github.com/orgs/toml-lang/issues",
  // members_url: "https://api.github.com/orgs/toml-lang/members{/member}",
  // public_members_url: "https://api.github.com/orgs/toml-lang/public_members{/member}",
  // avatar_url: "https://avatars.githubusercontent.com/u/7966854?v=4",
  // description: "Tom's Obvious, Minimal Language (and friends)"
};

const fetchOrganizations = createAsyncThunk<
  IUsersOrgs[],
  string,
  {
    rejectValue: string; // error type can be corrected FIXME:
  }
>(
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
      state.error = action.payload;
    });
  }
});

export default slice.reducer;

export const UsersOrganizationsAction = {
  ...slice.actions,
  fetchOrganizations
};
