import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";

//create action
export const createClient = createAsyncThunk(

  "createClient",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://tempin.qastco.co.uk:3231/api/client/insert",
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




export const getAllClients = createAsyncThunk(
  "getAllClients",
  async (UserId, { rejectWithValue }) => {
  
    try {
      const userIdString = String(UserId);

      const response = await fetch(
        "https://tempin.qastco.co.uk:3231/api/client/getall",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userIdString  }),
        }
      );

      if (!response.ok) {
        console.error("API Error:", response.statusText);
        const error = await response.json();
        return rejectWithValue(error);
      }

      const result = await response.json();
      return result;

    } catch (error) {
      // Handle network or JSON parsing errors
      return rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);




  export const resetSuccess = createAction("clientDetails/resetSuccess");

export const clientDetails = createSlice({
  name: "clientDetails",
  initialState: {
    Clients: [],
    CreatedClient:[],
    loading: false,
    status : 'idle',
    success: false, // Add success state

    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.success = false; 
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.CreatedClient.push(action.payload);
        state.success = true; // Set success to true on successful creation
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false; // 
      })
      .addCase(resetSuccess, (state) => {
        state.success = false; // Reset success state
      });

    builder
      .addCase(getAllClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.loading = false;
        state.Clients = action.payload; // Replace users array with the fetched data
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message or object
      });



      
  },
  
});

export default clientDetails.reducer;
