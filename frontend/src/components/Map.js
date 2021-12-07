import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const Map = (data) => {

    const [caseType, setCaseType] = useState("cases")

    const position = [51.505, -0.09]
    return (
        <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Map</h6>
            <div class="row align-items-center d-none d-sm-block">
                <div className="form-group">
                    <select className="form-control">
                        <option value="cases" selected={caseType === "cases"}>Cases</option>
                        <option value="active" selected={caseType === "active"}>Active</option>
                        <option value="recovered" selected={caseType === "recovered"}>Recovered</option>
                        <option value="deaths" selected={caseType === "deaths"}>Deaths</option>
                    </select>
                </div>
            </div>
            {/* <Dropdown /> */}
        </div>
        
        <div className="card-body">
            <div className="pt-4 pb-2">
                <div className="map">
                    <MapContainer center={position} zoom={8} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>
            </div>
        </div>            
    </div>

    )
}

export default Map
