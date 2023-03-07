import {useQuery} from "react-query";
import axios from "axios";
import {endpoint} from "../config";

export const useAbsences = (page= 1, pageSize=10)=>{
    return useQuery(['absences', page], async ()=>{
        return axios.get(`${endpoint}/api/absences?page=${1}&pageSize=${pageSize}`)
            .then(res=>res.data);
    }, { keepPreviousData : true, retry: 5 })
}