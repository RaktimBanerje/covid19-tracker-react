import { 
    numberFormatter
} from "../services/util"

const columns = [
    {
        Header: "Country",
        accessor: "country",
        sticky: "left"
    },
    {
        Header: "Cases",
        accessor: "todayCases",
        Cell: ({row}) => (
            <div>
                <span className="d-block font-weight-bold confirm-text"> {row.original.todayCases > 0 && `+ ${numberFormatter.format(row.original.todayCases)}`}</span>
                <span className="d-block">{numberFormatter.format(row.original.cases)}</span>
            </div>
        ) 
    },
    {
        Header: "Recovered",
        accessor: "todayRecovered",
        Cell: ({row}) => (
            <div>
                <span className="d-block font-weight-bold recovered-text"> {row.original.todayRecovered > 0 && `+ ${numberFormatter.format(row.original.todayRecovered)}`}</span>
                <span className="d-block">{numberFormatter.format(row.original.recovered)}</span>
            </div>
        ) 
    }, 
    {
        Header: "Deaths",
        accessor: "todayDeaths",
        Cell: ({row}) => (
            <div>
                <span className="d-block font-weight-bold deceased-text"> {row.original.todayDeaths > 0 && `+ ${numberFormatter.format(row.original.todayDeaths)}`}</span>
                <span className="d-block">{numberFormatter.format(row.original.deaths)}</span>
            </div>
        ) 
    },
    {
        Header: 'Active Cases',
        accessor: "active",
        Cell: ({value}) => numberFormatter.format(value)
    },
    {
        Header: "Critical Cases",
        accessor: "critical",
        Cell: ({value}) => numberFormatter.format(value)
    },
    {
        Header: "Cases/ 1M pop",
        accessor: "casesPerOneMillion",
        Cell: ({value}) => numberFormatter.format(value)
    },
    {
        Header: "Deaths/ 1M pop",
        accessor: "deathsPerOneMillion",
        Cell: ({value}) => numberFormatter.format(value)
    },
    {
        Header: "Active/ 1M pop",
        accessor: "activePerOneMillion",
        Cell: ({value}) => numberFormatter.format(value)
    },
    {
        Header: "Recovered/ 1M pop",
        accessor: "recoveredPerOneMillion",
        Cell: ({value}) => numberFormatter.format(value)
    },
    {
        Header: "Critical/ 1M pop",
        accessor: "criticalPerOneMillion",
        Cell: ({value}) => numberFormatter.format(value)
    },
    {
        Header: "Test/ 1M pop",
        accessor: "testsPerOneMillion",
        Cell: ({value}) => numberFormatter.format(value)
    },
    {
        Header: "Population",
        accessor: "population",
        Cell: ({value}) => numberFormatter.format(value)
    }
]

export default columns

// {
//     "updated": 0,
//     "country": "string",
//     "countryInfo": {
//       "_id": 0,
//       "iso2": "string",
//       "iso3": "string",
//       "lat": 0,
//       "long": 0,
//       "flag": "string"
//     },
//     "cases": 0,
//     "todayCases": 0,
//     "deaths": 0,
//     "todayDeaths": 0,
//     "recovered": 0,
//     "todayRecovered": 0,
//     "active": 0,
//     "critical": 0,
//     "casesPerOneMillion": 0,
//     "deathsPerOneMillion": 0,
//     "tests": 0,
//     "testsPerOneMillion": 0,
//     "population": 0,
//     "continent": 0,
//     "oneCasePerPeople": 0,
//     "oneDeathPerPeople": 0,
//     "oneTestPerPeople": 0,
//     "activePerOneMillion": 0,
//     "recoveredPerOneMillion": 0,
//     "criticalPerOneMillion": 0
//   }