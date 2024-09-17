import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  mdiCloudCheck,
  mdiBattery,
  mdiWifi,
  mdiCogs,
  mdiComment,
  mdiCalendarBlankMultiple,
  mdiMonitorDashboard,
  mdiBookAlphabet,
  mdiArrowUpBoldOutline 
} from "@mdi/js"
import Icon from "@mdi/react"

const ViewDevices = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([])
  const userId = "b4626d99-2f7a-498f-9411-ca669a91a86a"

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(
          "https://tempin.qastco.co.uk:3231/api/device/getopcard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          },
        )

        const data = await response.json()
        setDevices(data.devices)
      } catch (error) {
        console.error("Error fetching devices:", error)
      }
    }

    fetchDevices()
  }, [userId])

  const getBatteryIcon = level => {
    if (level >= 90) return "battery"
    else if (level >= 80) return "battery-90"
    else if (level >= 70) return "battery-80"
    else if (level >= 60) return "battery-70"
    else if (level >= 50) return "battery-60"
    else if (level >= 40) return "battery-50"
    else if (level >= 30) return "battery-40"
    else if (level >= 20) return "battery-30"
    else return "battery-outline"
  }

  const getWifiIcon = level => {
    if (level >= 75) return "wifi-strength-4"
    else if (level >= 50) return "wifi-strength-3"
    else if (level >= 25) return "wifi-strength-2"
    else if (level > 0) return "wifi-strength-1"
    else return "wifi-strength-outline"
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f4f8" }}>
      {devices.length > 0 ? (
        devices.map(device => (
          <div
            key={device.id}
            style={{
              margin: "30px auto",
              width: "600px",
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h2 style={{ fontSize: "1.5em", color: "#333" }}>{device.deviceName}</h2>
            </div>

            <div
              style={{
                height: "160px",
                borderRadius: "20px 20px 0 0",
                backgroundColor: device.lasttempalert === 0 ? "#27ae60" : "#e74c3c",
                color: "#fff",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "1.2em" }}>{device.tempUpLimit}°C</p>
                  <p style={{ fontSize: "1.2em" ,marginTop:40}}>{device.tempDownLimit}°C</p>
                
                </div>

                <div style={{ textAlign: "center" }}>
                  <h3 style={{ fontSize: "2.5em" }}>{device.lasttemperature}°C</h3>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {device.lastrangeoutCount > 0 && (
                      <>
                        <p>{device.lastrangeoutCount}</p>
                        <Icon path={mdiArrowUpBoldOutline} size={1} color="white" />
                      </>
                    )}
                  </div>
                  <p style={{ fontSize: "1.2em" }}>
                    {device.hotConfigWithLog === 0 ? ">" : ""}
                  </p>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <p>Last Updated: {new Date(device.lasttemperaturedate).toLocaleString()}</p>
              </div>
            </div>

            <div style={{ padding: "20px" }}>
            
              <p style={{textAlign:'center'}}>Next Update At:  {new Date(device.nextTempLogTakeAt).toLocaleString()}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                {/* Battery and WiFi Section */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i className={`mdi mdi-${getBatteryIcon(device.lastBatteryLevel)}`} style={{ fontSize: "24px", marginRight: "5px" }}></i>
                  <p>{device.lastBatteryLevel}%</p>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <i className={`mdi mdi-${getWifiIcon(device.lastWifiLevel)}`} style={{ fontSize: "24px", marginRight: "5px" }}></i>
                  <p>{device.lastWifiLevel}%</p>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className={`mdi ${device.connected === "1" ? "mdi-cloud-check" : "mdi-cloud-off"}`}
                    style={{ fontSize: "24px", marginRight: "5px", color: device.connected === "1" ? "green" : "red" }}
                  ></i>
                  <p>{device.connected === "1" ? "Connected" : "Disconnected"}</p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}
              >
                <div onClick={() => navigate(`/DeviceConfigurationSchedule/${device.id}/${device.deviceName}`)}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(2.02)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Icon path={mdiBookAlphabet} size={1.3} style={{ cursor: "pointer" }}  />
                </div>


                <div onClick={() => navigate(`/DeviceTempLog/${device.id}/${device.deviceName}`)}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(2.02)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                <Icon path={mdiMonitorDashboard} size={1.3} />

                </div>
                <div onClick={() => navigate(`/TempConfiguration/${device.id}/${userId}`)}>
                  <Icon path={mdiCogs} size={1.3} style={{ cursor: "pointer", color: "#3498db" }} />
                </div>
                <Icon path={mdiCalendarBlankMultiple} size={1.5} />
                <Icon path={mdiComment} size={1.5} />
              </div>

              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <h4>{device.deviceId}</h4>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading devices...</p>
      )}
    </div>
  )
}

export default ViewDevices
