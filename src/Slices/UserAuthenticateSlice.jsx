import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const loginUser = createAsyncThunk(

  "loginUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://tempin.qastco.co.uk:3231/api/Auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);








export const UserAuthenticateSlice = createSlice({
  name: "loginUser",
  initialState: {
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.isAuthenticated = false;

    },
},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;

      });

  



      
  },
  
});
export const { logout } = UserAuthenticateSlice.actions;

export default UserAuthenticateSlice.reducer;
