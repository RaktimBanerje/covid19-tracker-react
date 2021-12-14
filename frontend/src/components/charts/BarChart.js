import { Bar } from "react-chartjs-2"
import Chart from "chart.js/auto"
import "chartjs-adapter-date-fns"
import { abbreviateNumber } from "../../services/util"

const BarChart = ({
    label,
    borderColor,
    backgroundColor,
    data:timeSeriesData
}) => {

    const data = {
        datasets: [
            {
                label,
                data: timeSeriesData,
                borderColor: borderColor,
                backgroundColor: backgroundColor
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

    return <Bar data={data} options={options} />
}

export default BarChart
