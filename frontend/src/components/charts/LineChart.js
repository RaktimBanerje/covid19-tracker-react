import { Line } from "react-chartjs-2"
import Chart from "chart.js/auto"

const LineChart = ({
    data: timeSeriesData,
    borderColor,
    backgroundColor,
    pointRadius
}) => {

    const data = {
        datasets: [
            {
                data: timeSeriesData,
                borderColor,
                backgroundColor,
                pointRadius
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
          legend: {
              display: false
          },
          tooltip: {
              enabled: false
          }
        },
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
            },
        }
    }

    return <Line data={data} options={options} />
}

export default LineChart
