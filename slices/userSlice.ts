import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const res = await fetch("https://nestjs-postgres.onrender.com/users");
    const data = await res.json();
    return data;
  }
);

const initialState = {
  entities: [],
  loading: false,
  userscount: 0,
} as any;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.userscount++;
    },
    loadingToggle: (state) => {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
      state.userscount = state.entities.length;
    }),
      builder.addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export const { increment, loadingToggle } = userSlice.actions;
export default userSlice.reducer;
