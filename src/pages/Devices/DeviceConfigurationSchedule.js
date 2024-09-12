import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Spinner,
  Button,
} from "reactstrap";
import { Modal, Box, Typography, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const DeviceConfigurationSchedule = () => {
  const { device_id, device_name } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.authenticateUser.user.userId);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [scheduleTimes, setScheduleTimes] = useState([]);
  const maxSchedules = 10;

  const fetchSchedules = async () => {
    try {
      const response = await fetch(
        "https://tempin.qastco.co.uk:3231/api/schedule/selectconfig",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            devicepkId: parseInt(device_id),
            userId: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching schedule data");
      }

      const data = await response.json();
      setSchedules(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchSchedules();
  }, [device_id, userId]);

  const handleAddSchedule = (time) => {
    if (scheduleTimes.length < maxSchedules) {
      setScheduleTimes([...scheduleTimes, time]);
    } else {
      alert("You can add up to 10 schedules only.");
    }
  };

  const handleRemoveSchedule = (index) => {
    setScheduleTimes(scheduleTimes.filter((_, i) => i !== index));
  };

  const handleSubmitSchedules = async () => {
    try {
      const scheduleData = scheduleTimes.map((time) => ({
        hour: time.hour(),
        minute: time.minute(),
      }));

      console.log("Schedule Data ",scheduleData)

      const response = await fetch("https://tempin.qastco.co.uk:3231/api/schedule/insertconfigsch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: parseInt(device_id),
          userId: userId,
          frequency: scheduleData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add schedules");
      }

      alert("Schedules added successfully!");
      setModalOpen(false);
      setScheduleTimes([]);
          fetchSchedules();

    } catch (err) {
      console.error(err.message);
      alert("Failed to add schedules.");
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  if (loading) {
    return (
      <Spinner
        color="primary"
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        Loading...
      </Spinner>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-2">
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      


              <div
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <Button
                  color="danger"
                  onClick={() => navigate(-1)}
                  style={{ borderRadius: "20px", padding: "0.5rem 2rem" }}
                >
                  Back
                </Button>


                <Button
          onClick={handleOpenModal}
          color="primary"
          style={{ padding: ".5rem 1rem", width: "100%",marginLeft:50 }}
        >
          Add New Schedule
        </Button>

                </div>
      </div>

      <h1 style={{textAlign:'center',marginBottom:30}}>{device_name} Device Schedules</h1>

      <Row>
        {schedules.map((schedule) => (
          <Col md="4" key={schedule.id} className="mb-3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Schedule ID: {schedule.id}</CardTitle>
                <CardText>
                  <strong>Schedule Time:</strong> {schedule.scheduleTime} <br />
                  <strong>Enabled:</strong> {schedule.isenable ? "Yes" : "No"}{" "}
                  <br />
                  <strong>Created At:</strong>{" "}
                  {new Date(schedule.createdAt).toLocaleString()}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal open={modalOpen} onClose={handleCloseModal}>
  <Box
    sx={{
      padding: 4,
      backgroundColor: "white",
      borderRadius: 10,
      maxWidth: 500,
      margin: "auto",
      marginTop: "2%",
      maxHeight: "80vh", // Set max height for modal
      overflowY: "auto", // Enable vertical scrolling
    }}
  >
    <Typography variant="h6" gutterBottom>
      Add New Schedules
    </Typography>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {scheduleTimes.map((time, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <TimePicker
            label={`Schedule ${index + 1}`}
            value={time}
            onChange={(newValue) => {
              const updatedTimes = [...scheduleTimes];
              updatedTimes[index] = newValue;
              setScheduleTimes(updatedTimes);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button
            color="danger"
            onClick={() => handleRemoveSchedule(index)}
            style={{ marginLeft: "1rem" }}
          >
            Remove
          </Button>
        </div>
      ))}

      {scheduleTimes.length < maxSchedules && (
        <Button
          color="primary"
          onClick={() => handleAddSchedule(dayjs())}
          style={{ marginBottom: "1rem" }}
        >
          Add Schedule
        </Button>
      )}
    </LocalizationProvider>

    {/* Buttons placed inside a fixed footer-like container */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        position: "sticky", // Makes the buttons sticky to the bottom of the modal
        bottom: 0,
        backgroundColor: "white",
        paddingTop: "1rem",
        marginTop: "1rem",
      }}
    >
      <Button color="secondary" onClick={handleCloseModal}>
        Cancel
      </Button>
      <Button color="primary" onClick={handleSubmitSchedules}>
        Add
      </Button>
    </Box>
  </Box>
</Modal>
    </div>
  );
};

export default DeviceConfigurationSchedule;
