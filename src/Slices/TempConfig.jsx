import { createSlice } from "@reduxjs/toolkit";



export const TempConfig = createSlice({
    name: "TempConfig",
    initialState: {
      
        DeviceTempConfigData:'',
        loading: false,
        status: 'idle',
        success: false, // Add success state

        error: null,
    },
    reducers: {
        SingleDeviceTempConfigData: (state,action) => {
            state.DeviceTempConfigData = action.payload;
            state.status = 'succeeded';
            state.error = null;   
        },
    },
  

});

export const { SingleDeviceTempConfigData  } = TempConfig.actions;

export default TempConfig.reducer;
