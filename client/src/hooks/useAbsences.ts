import {useInfiniteQuery, useQuery} from "react-query";
import axios from "axios";
import {endpoint} from "../config";

export const useAbsences = (page= 1, pageSize=5, filters: any = null)=>{
    const queryParams = new URLSearchParams(filters);

    return useQuery(['absences', page], async ()=>{
        return axios.get(`${endpoint}/api/absences?page=${page}&pageSize=${pageSize}&filters=${queryParams}`)
            .then(res=>res.data);
    }, { keepPreviousData : true, retry: 5  })
}

export const useAbsencesInfinite = () => {
    const fetchAbsences = async ({ pageParam = 1,  pageSize=5}) => {
        return axios.get(`${endpoint}/api/absences?page=${pageParam}&pageSize=${pageSize}`)
            .then(res=>res.data);
    }

    return useInfiniteQuery('absences', fetchAbsences, {
        getNextPageParam: (lastPage, pages) => {
            console.log(lastPage, "lastPage");
            return lastPage.info.page + 1
        }
    });
}