import React, { useState, useEffect } from "react";
import {
  TextField, Switch, FormControlLabel, Grid, Button, MenuItem, Select,
  InputLabel, FormControl, CircularProgress, Snackbar, Alert
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAllClients } from "../../Slices/ClientSlices";
import { getAllClientsDevicesLocation } from '../../Slices/DevicesLocationSlice';
import { createClientDevice, getAllCategories } from '../../Slices/DeviceSlices';

const AddDevice = () => {
  const dispatch = useDispatch();
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const users = useSelector(state => state.authenticateUser.user);
  const client = useSelector(state => state.ClientDetails.Clients); // Assuming clients are stored here
  const device = useSelector((state) => state.clientLocation.DeviceLocation); // Get devices from Redux state
  const categories = useSelector((state) => state.Devices.Categories); // Get devices from Redux state

  const [formData, setFormData] = useState({
    deviceId: "18:D1:F9:22:14:84",
    deviceName: "Meet Fridge11",
    description: "",
    logRetake: 20,
    tempUpLimit: 20,
    tempDownLimit: 16,
    batteryLimit: 40,
    wifiLimit: 25,
    oemDebug: true,
    logEndPoint: "https://tempin.qastco.co.uk:3231/api/insight/templogarray",
    configEndPoint: "https://tempin.qastco.co.uk:3231/api/insight/tempconfig",
    gmtOffsetMin: 60,
    configDevicePause: false,
    oemDeviceStop: false,
    OemExpiryTimeUnix: 1729500108,
    OEMNoCall: false,
    oemConfigUpdate: true,
    wifiSignalFlag: true,
    ledBrightness: 79,
    reconnectSignalFlag: true,
    rangeOutSignalFlag: true,
    hotConfigWithLog: false,
    clientId: '',
    createdBy: users.userId,
    locationId: '',
    deviceCategoryId: '',
  });

  useEffect(() => {
    if (users.userId) {
      const UserId = { UserId: users.userId };
      dispatch(getAllClients(UserId));
      dispatch(getAllCategories(UserId));
    }
  }, [dispatch, users.userId]);

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
    setFormData({ ...formData, clientId });

    if (clientId) {
      dispatch(getAllClientsDevicesLocation({ userId: users.userId, clientId }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const updatedFormData = {
      ...formData,
      OemExpiryTimeUnix: parseInt(formData.OemExpiryTimeUnix),
      logRetake: parseInt(formData.logRetake),
      ledBrightness: parseInt(formData.ledBrightness),
      locationId: parseInt(formData.locationId), // Ensure locationId is a number
      deviceCategoryId: parseInt(formData.deviceCategoryId),
    };

    try {
      await dispatch(createClientDevice(updatedFormData)).unwrap();
      setAlertOpen(true); // Show success alert
    } catch (error) {
      console.error("Failed to create device:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <form>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Client</InputLabel>
              <Select
                value={selectedClient}
                onChange={handleClientChange}
              >
                {client.map((client) => (
                  <MenuItem key={client.clientId} value={client.clientId}>
                    {client.clientname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth disabled={!selectedClient}>
              <InputLabel>Client Device Location</InputLabel>
              <Select
                value={selectedDevice}
                onChange={(e) => {
                  setSelectedDevice(e.target.value);
                  setFormData({ ...formData, locationId: e.target.value });
                }}
              >
                {device.map((device) => (
                  <MenuItem key={device.id} value={device.id}>
                    {device.locationname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth disabled={!selectedClient}>
              <InputLabel>Devices Categories</InputLabel>
              <Select
                value={selectedCategories}
                onChange={(e) => {
                  setSelectedCategories(e.target.value);
                  setFormData({ ...formData, deviceCategoryId: e.target.value });
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.deviceCategoryId}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="deviceId"
              label="Device ID"
              value={formData.deviceId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="deviceName"
              label="Device Name"
              value={formData.deviceName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="logRetake"
              label="Log Retake"
              type="number"
              value={formData.logRetake}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="tempUpLimit"
              label="Temp Up Limit"
              type="number"
              value={formData.tempUpLimit}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="tempDownLimit"
              label="Temp Down Limit"
              type="number"
              value={formData.tempDownLimit}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="batteryLimit"
              label="Battery Limit"
              type="number"
              value={formData.batteryLimit}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="wifiLimit"
              label="WiFi Limit"
              type="number"
              value={formData.wifiLimit}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.oemDebug}
                  onChange={handleChange}
                  name="oemDebug"
                />
              }
              label="OEM Debug"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="logEndPoint"
              label="Log Endpoint"
              value={formData.logEndPoint}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="configEndPoint"
              label="Config Endpoint"
              value={formData.configEndPoint}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="gmtOffsetMin"
              label="GMT Offset (Min)"
              type="number"
              value={formData.gmtOffsetMin}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.configDevicePause}
                  onChange={handleChange}
                  name="configDevicePause"
                />
              }
              label="Config Device Pause"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.oemDeviceStop}
                  onChange={handleChange}
                  name="oemDeviceStop"
                />
              }
              label="OEM Device Stop"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="OemExpiryTimeUnix"
              label="OEM Expiry Time (Unix)"
              type="number"
              value={formData.OemExpiryTimeUnix}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.OEMNoCall}
                  onChange={handleChange}
                  name="OEMNoCall"
                />
              }
              label="OEM No Call"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.oemConfigUpdate}
                  onChange={handleChange}
                  name="oemConfigUpdate"
                />
              }
              label="OEM Config Update"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.wifiSignalFlag}
                  onChange={handleChange}
                  name="wifiSignalFlag"
                />
              }
              label="WiFi Signal Flag"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="ledBrightness"
              label="LED Brightness"
              type="number"
              value={formData.ledBrightness}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.reconnectSignalFlag}
                  onChange={handleChange}
                  name="reconnectSignalFlag"
                />
              }
              label="Reconnect Signal Flag"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.rangeOutSignalFlag}
                  onChange={handleChange}
                  name="rangeOutSignalFlag"
                />
              }
              label="Range Out Signal Flag"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.hotConfigWithLog}
                  onChange={handleChange}
                  name="hotConfigWithLog"
                />
              }
              label="Hot Config with Log"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Add Device"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity="success">
          Device added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddDevice;
