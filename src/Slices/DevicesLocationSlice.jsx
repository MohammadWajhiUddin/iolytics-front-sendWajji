import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { act } from "react";

//create action
export const createClientlocation = createAsyncThunk(

    "createClientlocation",
    async (data, { rejectWithValue }) => {

        const response = await fetch(
            "https://tempin.qastco.co.uk:3231/api/clientlocation/insert",
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




export const getAllClientsDevicesLocation = createAsyncThunk(
    "getAllClientsDevicesLocation",
    async ( { userId, clientId } , { rejectWithValue }) => {
     

        try {
            const userIdString = String(userId);
            const ClientIdString = String(clientId);

            const response = await fetch(
                "https://tempin.qastco.co.uk:3231/api/clientlocation/getall",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            userId: userIdString,
                            clientId: ClientIdString,

                        }
                    ),
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

export const clientLocation = createSlice({
    name: "clientLocation",
    initialState: {
        DeviceLocation: [],
        CreatedDevicesLocation: '',
        DeviceDetails:'',
        loading: false,
        status: 'idle',
        success: false, // Add success state

        error: null,
    },
    reducers: {
        SingleLocationDetails: (state,action) => {
          state.DeviceDetails = action.payload;
          state.status = 'succeeded';
          state.error = null;    
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createClientlocation.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(createClientlocation.fulfilled, (state, action) => {
                state.loading = false;
                state.CreatedDevicesLocation = action.payload;
                state.success = true; // Set success to true on successful creation
            })
            .addCase(createClientlocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false; // 
            })
            .addCase(resetSuccess, (state) => {
                state.success = false; // Reset success state
            });

        builder
            .addCase(getAllClientsDevicesLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllClientsDevicesLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.DeviceLocation = action.payload;
                state.status= 'succeeded' // Replace users array with the fetched data
            })
            .addCase(getAllClientsDevicesLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store the error message or object
            });




    },

});

export const { SingleLocationDetails } = clientLocation.actions;

export default clientLocation.reducer;
