import { Line } from "react-chartjs-2"
import Chart from "chart.js/auto"
import "chartjs-adapter-date-fns"
import { abbreviateNumber } from "../../services/util"

const TotalActiveChart = ({data:timeSeriesData}) => {

    const data = {
        datasets: [
            {
                label: "Active Cases",
                data: timeSeriesData,
                borderColor: ["rgba(42, 217, 217, 1)"],
                backgroundColor: ["rgba(42, 217, 217, 1)"]
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                type: "time",
                time: {
                    displayFormats: {
                        quarter: "MM YYYY"
                    }
                }
            }, 
            y: {
                min: 0,
                ticks: {
                    beginAtZero: true,
                    callback: value => abbreviateNumber(value)
                }
            }
        }
    }

    return <Line data={data} options={options} />
}

export default TotalActiveChart
