import { Line } from "react-chartjs-2"
import Chart from "chart.js/auto"
import "chartjs-adapter-date-fns"
import { abbreviateNumber } from "../../services/util"

const InfectedvsRecoveredChart = ({cases:newCase, recovered:newRecovered}) => {

    const data = {
        datasets: [
            {
                label: "Infected",
                data: newCase,
                borderColor: ["rgba(255, 47, 58, 1)"],
                backgroundColor: ["rgba(255, 47, 58, 1)"]
            },
            {
                label: "Recovered",
                data: newRecovered,
                borderColor: ["rgba(39, 167, 69, 1)"],
                backgroundColor: ["rgba(39, 167, 69, 1)"]
            }
        ]
    }

    const options = {
        label: "Newly Infected vs Newly Recovered",
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

export default InfectedvsRecoveredChart
