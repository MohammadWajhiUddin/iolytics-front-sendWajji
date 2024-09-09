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
} from "@mdi/js" // Import the necessary icons
import Icon from "@mdi/react" // You will need to use an icon library like `@mdi/react` to render SVG icons


const ViewDevices = () => {

  const navigate = useNavigate();
  const [devices, setDevices] = useState([])
  const userId = "b4626d99-2f7a-498f-9411-ca669a91a86a" // Replace this with your actual userId
//add battery icon
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
            body: JSON.stringify({
              userId,
            }),
          },
        )

        const data = await response.json()
        setDevices(data.devices) // Assuming devices is the array returned
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
    else if (level >= 10) return "battery-20"
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
    <div>
      {devices.length > 0 ? (
        devices.map(device => (
          <div
            key={device.id}
            style={{
              marginTop: 30,
              width: 600,
              height: 350,
              borderRadius: 30,
              borderWidth: 2,
              backgroundColor: "#BDF6FE",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                paddingTop: 20,
              }}
            >
              <h1>{device.deviceName}</h1>
            </div>

            <div
              style={{
                height: 160,
                borderWidth: 2,
                borderColor: "black",
                backgroundColor: device.lasttempalert === 0 ? "green" : "red",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingTop: 20,
                  marginTop: 15,
                }}
              >
                <div
                  style={{
                    width: 60,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p>{device.tempDownLimit}</p>
                  <p>{device.tempUpLimit}</p>
                </div>

                <div
                  style={{
                    width: 300,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <h3>{device.lasttemperature}°C</h3>
                </div>

                <div
                  style={{
                    width: 60,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    display: "flex",
                    marginLeft: 20,
                    alignItems: "center",
                  }}
                >
                  {
                    //                         /***
                    //                          *  "lasttempupalert": 1,
                    // "lasttempdownalert": 0,
                    //                          */
                  }

                  <div style={{display:'flex',flexDirection:'row'}}>
                      <p style={{marginTop:2}}>
                        {device.lastrangeoutCount > 0? device.lastrangeoutCount: ""}
                      </p>
                       <p>
                         {device.lastrangeoutCount > 0? <Icon path={mdiArrowUpBoldOutline} size={1} color="white"/>: ""}
                      </p>
                  </div>
                

              

                  <p style={{ fontSize: 20 }}>
                    {" "}
                    {device.hotConfigWithLog === 0 ? ">" : ""}
                  </p>
                </div>
              </div>

              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <h1>
                  At {new Date(device.lasttemperaturedate).toLocaleTimeString()}
                </h1>
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <div
                style={{
                  height: 40,
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <p>Next At {device.nextTempTake}</p>
              </div>

              <div
                style={{
                  paddingLeft: 20,
                  paddingRight: 10,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Battery Icon and Level */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className={`mdi mdi-${getBatteryIcon(
                      device.lastBatteryLevel,
                    )}`}
                    style={{ fontSize: 24, marginRight: 5 }}
                  ></i>
                  <p>{device.lastBatteryLevel}%</p>
                </div>

                {/* WiFi Icon and Level */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className={`mdi mdi-${getWifiIcon(device.lastWifiLevel)}`}
                    style={{ fontSize: 24, marginRight: 5 }}
                  ></i>
                  <p>{device.lastWifiLevel}%</p>
                </div>

                {/* Device Connection Status */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className={`mdi ${
                      device.connected === "1"
                        ? "mdi-cloud-check"
                        : "mdi-cloud-off"
                    }`}
                    style={{
                      fontSize: 24,
                      marginRight: 5,
                      color: device.connected === "1" ? "green" : "red",
                    }}
                  ></i>
                  <p>
                    Status:{" "}
                    {device.connected === "1" ? "Connected" : "Disconnected"}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <Icon path={mdiBookAlphabet} size={1} />

                  <Icon path={mdiMonitorDashboard} size={1} />

                 
                 <div  onClick={() => navigate(`/TempConfiguration/${device.id}/${userId}`)}>
                   <Icon path={mdiCogs} size={1} />
                   </div>

                  <Icon path={mdiCalendarBlankMultiple} size={1} />

                  <Icon path={mdiComment} size={1} />
                </div>
              </div>

              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <h3>{device.deviceId}</h3>
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
