import React from "react" 
import { useState } from "react"
import { numberFormatter } from "../services/util"
import { caseTypeColor, caseTypeMultiplier } from "../services/constants/constants"
import "leaflet/dist/leaflet.css"

const MapContainer = React.lazy(
    ()=>  import("react-leaflet").then(module => ({default: module.MapContainer}))
)

const TileLayer = React.lazy(
    ()=>  import("react-leaflet").then(module => ({default: module.TileLayer}))
)

const Circle = React.lazy(
    ()=>  import("react-leaflet").then(module => ({default: module.Circle}))
)

const Popup = React.lazy(
    ()=>  import("react-leaflet").then(module => ({default: module.Popup}))
)

const Map = ({data}) => {

    const [caseType, setCaseType] = useState("cases")
       
    // const position = [51.505, -0.09]

    const ShowDataOnMap = ({data}) => data.map(country => (
        <Circle
            center      = {[country.countryInfo.lat, country.countryInfo.long]}
            color       = {caseTypeColor[caseType]}
            fillColor   = {caseTypeColor[caseType]}
            fillOpacity = {0.4}
            radius      = {
                Math.sqrt(country[caseType] * caseTypeMultiplier[caseType])
            }
        >
            <Popup>
                <div className="info-container">
                <div
                    className="info-flag"
                    style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                ></div>
                <div className="info-name">{country.country}</div>
                <div className="info-confirmed">
                    Cases: {numberFormatter.format(country.cases)}
                </div>
                <div className="info-recovered">
                    Recovered: {numberFormatter.format(country.recovered)}
                </div>
                <div className="info-deaths">
                    Deaths: {numberFormatter.format(country.deaths)}
                </div>
                </div>
            </Popup>
        </Circle>
    )
)
    
    return (
        <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Map</h6>
            <div class="row align-items-center">
                <div className="form-group">
                    <select className="form-control" value={caseType} onChange={e => setCaseType(e.target.value)}>
                        <option value="cases">Cases</option>
                        <option value="active">Active</option>
                        <option value="recovered">Recovered</option>
                        <option value="deaths">Deaths</option>
                    </select>
                </div>
            </div>
            {/* <Dropdown /> */}
        </div>
        
        <div className="card-body">
            <div className="pt-4 pb-2">
                <div className="map">
                    <React.Suspense fallback="Loading...">
                        <MapContainer center={[20, 77]} zoom={4} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <ShowDataOnMap data={data} />
                        </MapContainer>
                    </React.Suspense>
                </div>
            </div>
        </div>            
    </div>
    )
}

export default Map
