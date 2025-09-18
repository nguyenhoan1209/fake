import{useQuery} from "@tanstack/react-query";
import{fetcher,HTTPMethod}from"config/api";





const useFetchTopics = (streamId:number | null) => {
    return useQuery({
        queryKey: ["topics", streamId],
        queryFn:():Promise<any>=>{
            return fetcher({
                method:HTTPMethod.GET,
                url:`api/v1/users/me/${streamId}/topics`,
            });
        },
        enabled: !! streamId,

    });         

}

export {useFetchTopics};

