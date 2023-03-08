import {useInfiniteQuery, useQuery} from "react-query";
import axios from "axios";
import {endpoint} from "../config";
import {useState} from "react";

export const useAbsences = ()=>{
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const getAbsences = async (page= 1, pageSize=10, filters: any = null,) => {
        setLoading(true);
        try {
            await new Promise<void>(function(resolve) {
                setTimeout(function() {
                    resolve();
                }, 4000); // 2000 milliseconds = 2 seconds
            });

            const queryParams = new URLSearchParams(filters);
            const response = await axios.get(`${endpoint}/api/absences?page=${page}&pageSize=${pageSize}&${queryParams}`);
            setData(response.data);
            setLoading(false);
        }
        catch (e: any) {
            setError(e);
            setLoading(false);
        }
    }

    return {
        error,
        data,
        loading,
        getAbsences
    }
}

export const useAbsencesInfinite = () => {
    const fetchAbsences = async ({ pageParam = 1,  pageSize=5}) => {
        return axios.get(`${endpoint}/api/absences?page=${pageParam}&pageSize=${pageSize}`)
            .then(res=>res.data);
    }

    return useInfiniteQuery('absences', fetchAbsences, {
        getNextPageParam: (lastPage, pages) => {
            return lastPage.info.page + 1
        }
    });
}