const ChartContainer = ({title, children}) => {
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
            </div>
            
            <div className="card-body">
                <div className="pt-4 pb-2">
                    {children}
                </div>
            </div>            
        </div>
    )
}

export default ChartContainer
