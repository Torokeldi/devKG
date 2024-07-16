import { useState, useEffect } from "react";
import { Job } from "./types";

interface UseFetchResult {
    data: Job[];
    isLoading: boolean;
    refetch: () => void;
}

const useFetch = (
    { url } = {
        url: "http://3.38.98.134/",
    }
): UseFetchResult => {
    const [data, setData] = useState<Job[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log("API response:", result);
            if (result.statusCode === 200) {
                setData(result.data as Job[]);
                console.log("Jobs data:", result.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return {
        isLoading,
        data,
        refetch: fetchData,
    };
};

export default useFetch;
