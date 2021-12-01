import { numberFormatter } from "../services/utils/commonFunctions"
const ReportBox = ({
    title,
    color,
    data
}) => {
    const {total, today} = data

    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className={`card shadow h-100 py-2 ${color}-border`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-uppercase mb-1 ${color}-text`}>{title}</div>
                            {
                                today ? 
                                    <div className={`h6 mb-0 ${color}-text`}>+{numberFormatter.format(today)}</div>
                                    :
                                    null
                            }
                            {
                                total? 
                                    <div className={`h5 mb-0 font-weight-bold ${color}-text`}>{numberFormatter.format(total)}</div>
                                    :
                                    null
                            }                    
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportBox
