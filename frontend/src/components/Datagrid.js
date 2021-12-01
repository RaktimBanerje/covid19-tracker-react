import React from "react"
import { useTable, useBlockLayout, useSortBy, useGlobalFilter } from "react-table"
import { FixedSizeList as List } from "react-window"

const Datagrid = ({columns:COLUMNS, data:DATA}) => {

    const columns = React.useMemo(()=> COLUMNS, [])
    const data = React.useMemo(()=> DATA, [])    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        state,
        setGlobalFilter,
        rows,
        prepareRow
      } = useTable(
            {
              columns, 
              data, 
              initialState: {
                sortBy: [
                    {
                        id: "todayCases",
                        desc: true
                    }
                ],
              },
              defaultCanSort: true
            }, 
            useBlockLayout, 
            useGlobalFilter,
            useSortBy,
        )
    
    const { globalFilter } = state 
    
    const RenderRow = React.useCallback(({ index, style }) => {
        const row = rows[index];
        prepareRow(row);
        return (
          <tr {...row.getRowProps({style})} className="tr">
            {row.cells.map((cell) =>
              <td {...cell.getCellProps()} className="td">{cell.render("Cell")}</td>
            )}
          </tr>
        );
      },
      [prepareRow, rows]
    )

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Covid-19 Data</h6>
                <div class="row align-items-center d-none d-sm-block">
                    <div class="input-group">
                        <input class="form-control border-end-0 border rounded-pill" type="search" placeholder="Search..." value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} id="example-search-input" />
                        <span class="input-group-append">
                            <button class="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill" type="button" style={{marginLeft: "-40px"}}>
                                <i class="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </div>
                {/* <Dropdown /> */}
            </div>
            
            <div className="card-body">
                <div className="pt-4 pb-2">
                    <div className="table-responsive">
                        <table {...getTableProps()} className="table sticky text-center">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                                    {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                                        {column.render("Header")}
                                        {
                                            column.isSorted? column.isSortedDesc? "D" : "A" : null
                                        }
                                    </th>
                                    ))}
                                </tr>
                                ))}
                            </thead>

                            <tbody {...getTableBodyProps()} className="body">
                                <List
                                    height={400}
                                    itemCount={rows.length}
                                    itemSize={60}
                                    width={"100%"}
                                    overscanCount={11}
                                >
                                    {RenderRow}
                                </List>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Datagrid
