import { useQuery } from "@tanstack/react-query";

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
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok){
                return [];
            }
            const result = await response.json();
            return result.data;
        } catch (err: unknown) {
            return [];
        }
    };
    const {data=[], isLoading, error, refetch} = useQuery({
        queryKey: [url],
        queryFn: fetchData,
    })
    return {
        data,
        isLoading,
        error: error as string | null,
        refetch,
    };
};

export default useFetch;
