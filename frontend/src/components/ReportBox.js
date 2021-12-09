import { numberFormatter } from "../services/util"
import LineChart from "./charts/LineChart"

const ReportBox = ({
    title,
    color,
    data,
    graph
}) => {
    const {total, today} = data

    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className={`card shadow h-100 py-2 ${color}-border`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center justify-content-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-uppercase mb-1 ${color}-text text-center`}>
                                {title}
                            </div>
                            <div className="row">
                                <div className="col-6">
                                {
                                    today ? 
                                        <div className={`h6 mb-0 ${color}-text d-inline text-left`}>+{numberFormatter.format(today)}</div>
                                        :
                                        null
                                }
                                </div>
                                <div className="col-6">
                                {
                                    total? 
                                        <div className={`h5 mb-0 font-weight-bold ${color}-text text-right`}>{numberFormatter.format(total)}</div>
                                        :
                                        null
                                }        
                                </div>
                            </div>             
                        </div>
                        <div className="col-auto mt-4">
                           <LineChart {...graph} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportBox
