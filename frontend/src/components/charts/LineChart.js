import { Line } from "react-chartjs-2"
import Chart from "chart.js/auto"

const LineChart = ({
    data: timeSeriesData
}) => {

    const data = {
        datasets: [
            {
                label: "",
                data: timeSeriesData
            }
        ]
    }

    const options = {
        scales: {
            x: {
                display: false,
                type: "time",
                time: {
                    displayFormats: {
                        quarter: "MM YYYY"
                    }
                }
            },
            y: {
                display: false,
                min: 0,
            },
        }
    }

    return <Line data={data} options={options} />
}

export default LineChart
