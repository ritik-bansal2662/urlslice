import { useQuery } from "react-query"
import api from '../api/api'

export const useFetchMyShortUrls = (token, onError) => {
    // const options = {
        // we might want to transform ther esponse in a particular format
        // we might have onError function to handle error
        // caching option, etc.
    // }

    // QUERY_KEY, async function, options object
    return useQuery("my-shortenurls", //QUERY KEY
        async () => { // async Function
            return await api.get(
                "/api/urls/myurls",
                {
                    headers: {
                        "Content-Type" : "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
        }, 
        { // options object
            select: (data) => {
                const sortedData = data.data.sort(
                    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                )

                return sortedData;

            },
            onError,
            staleTime: 5000 // this keeps the query 'fresh' for 5 sec, if the component remounts it will not generate new query
        }
    )
}


export const useFetchTotalClicks = (token, onError) => {
    // const options = {
        // we might want to transform ther esponse in a particular format
        // we might have onError function to handle error
        // caching option, etc.
    // }

    // QUERY_KEY, async function, options object
    return useQuery("url-totalclick", //QUERY KEY
        async () => { // async Function
            return await api.get(
                "/api/urls/totalClicks?startDate=2025-01-01&endDate=2025-12-31",
                {
                    headers: {
                        "Content-Type" : "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
        }, 
        { // options object
            select: (data) => {
                const convertToArray = Object.keys(data.data).map((key) => ({
                    clickDate: key,
                    count : data.data[key]
                }));

                return convertToArray;

            },
            onError,
            staleTime: 5000 // this keeps the query 'fresh' for 5 sec, if the component remounts it will not generate new query
        }
    )
}