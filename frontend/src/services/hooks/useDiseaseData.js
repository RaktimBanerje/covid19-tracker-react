import { fetchWorldometersData } from '../api/disease'
import { useQuery } from 'react-query'

const useDiseaseData = () => {

    return useQuery(['worldometers', 'all'], fetchWorldometersData)
}

export default useDiseaseData
