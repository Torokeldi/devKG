import { useState, useEffect, useCallback } from "react";

interface UseFetchOptions {
    url: string;
}

interface UseFetchResult<T> {
    data: T[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

const useFetch = <T = any>({ url }: UseFetchOptions): UseFetchResult<T> => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result.data as T[]);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchData,
    };
};

export default useFetch;
