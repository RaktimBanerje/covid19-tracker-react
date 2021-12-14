import axios from "axios"

export const fetchWorldometersAllData = () => axios.get("/api/v1/covid-19/all")

export const fetchWorldometersCountriesData = () => axios.get("/api/v1/covid-19/countries")

// Get global accumulated COVID-19 time series data
export const fetchHistoricalAllData = ({queryKey}) => axios.get(`/api/v1/covid-19/historical/all?lastdays=${queryKey[2]}`) 

export const fetchHistoricalCountriesData = ({lastdays = "all"}) => axios.get(`/api/v1/covid-19/historical?lastdays=${lastdays}`)