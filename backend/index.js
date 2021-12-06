require("dotenv").config()
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const {format} = require("date-fns")
const app = express()

app.use(cors())

app.get("/api/v1/covid-19/all", async (req, res) => {
    const {data} = await axios.get("https://disease.sh/v3/covid-19/all")
    res.json(data)
})

app.get("/api/v1/covid-19/countries", async (req, res) => {
    const {data} = await axios.get("https://disease.sh/v3/covid-19/countries")
    res.json(data)
})


app.get("/api/v1/covid-19/historical/all", async (req, res) => {
    const lastdays = req.query.lastdays || "all"
    const {data} = await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=${lastdays}`)
    
    const actives = {...data.cases}
    for(const [key, value] of Object.entries(actives))
        actives[key] = value - (data.deaths[key] + data.recovered[key])

    const result = await Promise.all([
        calculateDailyCasesFromTotalCases(data.cases),
        calculateDailyCasesFromTotalCases(data.deaths),
        calculateDailyCasesFromTotalCases(data.recovered),
        calculateDailyCasesFromTotalCases(actives)        
    ])

    const response = {
        totalCases: objectToArray(data.cases),
        dailyCases: result[0],
        totalDeaths: objectToArray(data.deaths),
        dailyDeaths: result[1],
        totalRecovered: objectToArray(data.recovered),
        dailyRecovered: result[2],
        totalActives: objectToArray(actives),
        dailyActives: result[3]
    }

    res.json(response)
})

function objectToArray (obj) {
    if(typeof obj === "object"){
        const array = []
        for(let [key, value] of Object.entries(obj)){
            key = format(new Date(key), "yyyy-MM-dd")
            array.push({
                x: key,
                y: value
            })
        }
        return array
    }else{
        throw new Array(`Expect object, got ${typeof obj}!`)
    }
}

async function calculateDailyCasesFromTotalCases (data) {
    const calcData = []
    let prev = 0

    for (let [key, value] of Object.entries(data)){
        calcData.push({
            x: format(new Date(key), "yyyy-MM-dd"),
            y: value === 0 ? value : value - prev
        })
        prev = value            
    }

    return calcData
}

app.listen(process.env.PORT, () => console.log(`Server is running on PORT: ${process.env.PORT}`))


