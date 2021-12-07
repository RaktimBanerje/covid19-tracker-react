import React from 'react'
import { useQuery } from 'react-query'
import { 
    fetchWorldometersAllData,
    fetchWorldometersCountriesData,
    fetchHistoricalAllData
} from '../services/api/disease'
import columns from '../components/Columns'
import Navbar from '../components/Navbar'
import ReportBox from '../components/ReportBox'
import BarChart from '../components/charts/BarChart'
import TotalActive from '../components/charts/TotalActive'
import InfectedvsRecovered from "../components/charts/InfectedvsRecovered"
import Card from '../components/Card'
import Map from '../components/Map'

const Datagrid = React.lazy(() => import("../components/Datagrid"))

const Dashboard = () => {

    const worldometersAllData = useQuery(['worldometers', 'all'], fetchWorldometersAllData)
    const worldometersCountriesData = useQuery(['worldometers', 'countries'], fetchWorldometersCountriesData)
    const worldHistoricalDataFromStart = useQuery(["jhucsse", "historical", "all"], fetchHistoricalAllData)
    const worldHistoricalDataFrom30Days = useQuery(["jhucsse", "historical", "31"], fetchHistoricalAllData)
    
    return (
        <React.Fragment>
            <div id="wrapper">                
                <div id="content-wrapper" className="d-flex flex-column">                                
                    <div id="content">

                        <Navbar />      
                                          
                        <div className="container-fluid">

                            <div className="row">                                                                
                                {/* Confirm Report */}
                                <ReportBox 
                                    title="Confirm" 
                                    color="confirm" 
                                    data={{
                                        total: worldometersAllData?.data?.data.cases,
                                        today: worldometersAllData?.data?.data.todayCases,
                                    }} 
                                    graph={{
                                        data: worldHistoricalDataFrom30Days?.data?.data.dailyCases.slice(1),
                                        borderColor: ["rgba(255, 47, 58, 1)"],
                                        backgroundColor: ["rgba(255, 47, 58, 1)"],
                                        pointRadius: [...Array(30)].map((_, index) => index === 29 ? 8 : 0)
                                    }}
                                />
                                
                                {/* Active Report */}
                                <ReportBox 
                                    title="Active" 
                                    color="active" 
                                    data={{
                                        total: worldometersAllData?.data?.data.active,
                                    }}
                                    graph={{
                                        data: worldHistoricalDataFrom30Days?.data?.data.totalActives.slice(1),
                                        borderColor: ["rgb(23, 128, 216)"],
                                        backgroundColor: ["rgb(23, 128, 216)"],
                                        pointRadius: [...Array(30)].map((_, index) => index === 29 ? 8 : 0)
                                    }} 
                                />

                                {/* Recovered Report */}
                                <ReportBox 
                                    title="Recovered" 
                                    color="recovered"
                                    data={{
                                        total: worldometersAllData?.data?.data.recovered,
                                        today: worldometersAllData?.data?.data.todayRecovered,
                                    }}
                                    graph={{
                                        data: worldHistoricalDataFrom30Days?.data?.data.dailyRecovered.slice(1),
                                        borderColor: ["rgba(39, 167, 69, 1)"],
                                        backgroundColor: ["rgba(39, 167, 69, 1)"],
                                        pointRadius: [...Array(30)].map((_, index) => index === 29 ? 8 : 0)
                                    }} 
                                />

                                {/* Deceased Report */}
                                <ReportBox 
                                    title="Deceased" 
                                    color="deceased"
                                    data={{
                                        total: worldometersAllData?.data?.data.deaths,
                                        today: worldometersAllData?.data?.data.todayDeaths,
                                    }}
                                    graph={{
                                        data: worldHistoricalDataFrom30Days?.data?.data.dailyDeaths.slice(1),
                                        borderColor: ["rgba(113, 122, 130, 1)"],
                                        backgroundColor: ["rgba(113, 122, 130, 1)"],
                                        pointRadius: [...Array(30)].map((_, index) => index === 29 ? 8 : 0)
                                    }} 
                                />
                            </div>                            

                            <div className="row">                                
                                <div className="col-xl-8 col-lg-7">
                                    <React.Suspense fallback="Loading">
                                        {
                                            worldometersCountriesData?.data?.data ? 
                                                <Datagrid
                                                    columns={columns}
                                                    data={worldometersCountriesData.data.data}
                                                />
                                            :
                                            "Loading..."   
                                        }
                                    </React.Suspense>
                                </div>
                                
                                <div className="col-xl-4 col-lg-5">
                                {                                    
                                    worldometersCountriesData?.data?.data ? 
                                        <Map data={worldometersCountriesData.data.data}/>
                                    :
                                    "Loading..."   
                                }
                                </div>
                            </div>

                            <div className="row">                                
                                <div className="col-xl-6 col-lg-7">
                                    <React.Suspense fallback="Loading">
                                        {
                                            worldHistoricalDataFromStart?.data?.data && 
                                            <Card
                                                title="Daily New Cases"
                                            >
                                                <BarChart 
                                                    label="Daily New Cases"
                                                    data={worldHistoricalDataFromStart.data.data.dailyCases}
                                                    borderColor={["rgba(255, 47, 58, 1)"]}
                                                    backgroundColor={["rgba(255, 47, 58, 1)"]}
                                                    
                                                />
                                            </Card>
                                        }
                                    </React.Suspense>
                                </div>
                                
                                <div className="col-xl-6 col-lg-7">
                                    <React.Suspense fallback="Loading">
                                        {
                                            worldHistoricalDataFromStart?.data?.data &&
                                            <Card
                                                title="Daily Deaths"
                                            > 
                                                <BarChart
                                                    label="Daily Deaths" 
                                                    data={worldHistoricalDataFromStart.data.data.dailyDeaths}
                                                    borderColor={["rgba(113, 122, 130, 1)"]}
                                                    backgroundColor={["rgba(113, 122, 130, 1)"]}
                                                />
                                            </Card>
                                        }
                                    </React.Suspense>
                                </div>

                                <div className="col-xl-6 col-lg-7">
                                    <React.Suspense fallback="Loading">
                                        {
                                            worldHistoricalDataFromStart?.data?.data && 
                                            <Card
                                                title="Daily Recovered"
                                            >
                                                <BarChart
                                                    label="Daily Recovered" 
                                                    data={worldHistoricalDataFromStart.data.data.dailyRecovered}
                                                    borderColor={["rgba(39, 167, 69, 1)"]}
                                                    backgroundColor={["rgba(39, 167, 69, 1)"]}
                                                />
                                            </Card>
                                        }
                                    </React.Suspense>
                                </div>

                                <div className="col-xl-6 col-lg-7">
                                    <React.Suspense fallback="Loading">
                                        {
                                            worldHistoricalDataFromStart?.data?.data &&
                                            <Card
                                                title="Active Cases"
                                            > 
                                                <TotalActive
                                                    data={worldHistoricalDataFromStart.data.data.totalActives}
                                                />
                                            </Card>
                                        }
                                    </React.Suspense>
                                </div>

                                <div className="col-xl-6 col-lg-7">
                                    <React.Suspense fallback="Loading">
                                        {
                                            worldHistoricalDataFromStart?.data?.data &&
                                            <Card
                                                title="Infected vs Recovered"
                                            > 
                                                <InfectedvsRecovered
                                                    cases={worldHistoricalDataFromStart.data.data.totalCases}
                                                    recovered={worldHistoricalDataFromStart.data.data.totalRecovered}
                                                />
                                            </Card>
                                        }
                                    </React.Suspense>
                                </div>
                            </div>
                        </div>                        
                    </div>                                    
                </div>
            </div>
                
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
        </React.Fragment>
    )
}

export default Dashboard

// STACKOVERFLOW NUMBER FORMATTER IN JAVA-SCRIPT
// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900

// COVID-19-REACT GITHUB REPO 
// https://github.com/covid19india/covid19india-react/blob/master/src/utils/commonFunctions.js