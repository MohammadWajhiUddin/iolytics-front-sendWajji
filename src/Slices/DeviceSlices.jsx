import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createClientDevice = createAsyncThunk(

    "createClientDevice",
    async (data, { rejectWithValue }) => {

        const response = await fetch(
            "https://tempin.qastco.co.uk:3231/api/device/insert",
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

export const createDeviceCategory = createAsyncThunk(
    "createDeviceCategory",
    async (data, { rejectWithValue }) => {

        const response = await fetch(
            "https://tempin.qastco.co.uk:3231/api/devicecategory/insert",
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




export const getAllCategories = createAsyncThunk(
    "getAllCategories",
    async ( { userId } , { rejectWithValue }) => {
        try {
            const userIdString = String(userId);
            const response = await fetch(
                "https://tempin.qastco.co.uk:3231/api/devicecategory/getall",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            userId: userIdString,
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


export const updateDeviceCategory = createAsyncThunk(
    "updateDeviceCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://tempin.qastco.co.uk:3231/api/devicecategory/update`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            if (!response.ok) {
                return rejectWithValue(result);
            }
            return result;
        } catch (error) {
            return rejectWithValue(error.message || "An unexpected error occurred");
        }
    }
);


export const ClientDevices = createSlice({
    name: "ClientDevices",
    initialState: {
        Device:[],
        Categories:[],
        Category:'',
        loading: false,
        status: 'idle',
        success: false, // Add success state

        error: null,
    },
    reducers: {
        SingleCategoryDetails: (state,action) => {
            state.Category = action.payload;
            state.status = 'succeeded';
            state.error = null;   
        },
        resetSuccess: (state) => {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createClientDevice.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(createClientDevice.fulfilled, (state, action) => {
                state.loading = false;
                state.Device = action.payload;
                state.success = true; // Set success to true on successful creation
            })
            .addCase(createClientDevice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false; // 
            })
            .addCase(resetSuccess, (state) => {
                state.success = false; // Reset success state
            });


            builder
            .addCase(createDeviceCategory.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(createDeviceCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.Category = action.payload;
                state.success = true; // Set success to true on successful creation
            })
            .addCase(createDeviceCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false; // 
            })



            

            builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.Categories = action.payload;
                state.success = true; // Set success to true on successful creation
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false; // 
            })

            builder
            .addCase(updateDeviceCategory.pending, (state) => {
                state.loading = true;
                state.success = false;
            })
            .addCase(updateDeviceCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.Category = action.payload;
                state.success = true;
            })
            .addCase(updateDeviceCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
         
         

        // builder
        //     .addCase(getAllClientsDevicesLocation.pending, (state) => {
        //         state.loading = true;
        //     })
        //     .addCase(getAllClientsDevicesLocation.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.DeviceLocation = action.payload;
        //         state.status= 'succeeded' // Replace users array with the fetched data
        //     })
        //     .addCase(getAllClientsDevicesLocation.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.payload; // Store the error message or object
        //     });




    },

});

export const { SingleCategoryDetails ,resetSuccess } = ClientDevices.actions;

export default ClientDevices.reducer;
