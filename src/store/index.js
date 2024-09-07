import { configureStore } from "@reduxjs/toolkit";
import UserAuthenticateSlice from "../Slices/UserAuthenticateSlice";
import ClientSlices from "Slices/ClientSlices";
import  clientLocation  from "Slices/DevicesLocationSlice";
import Devices from "Slices/DeviceSlices"
 const store = configureStore({
    reducer:{
        authenticateUser:UserAuthenticateSlice,
        ClientDetails:ClientSlices,
        clientLocation:clientLocation,
        Devices:Devices
    },
    devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools only in development

})

export default store