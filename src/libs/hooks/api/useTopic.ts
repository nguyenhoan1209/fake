import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, HTTPMethod } from "config/api";





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

// Hook để pin một topic
const usePinTopic = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ topicId, streamId }: { topicId: string; streamId: number }): Promise<any> => {
            return fetcher(
                {
                    method: HTTPMethod.POST,
                    url: `api/v1/topics/${topicId}/pin`,
                    data: { stream_id: streamId },
                },
                { withToken: true }
            );
        },
        onSuccess: (_, { streamId }) => {
            // Invalidate topics query để refetch data mới
            queryClient.invalidateQueries({ queryKey: ['topics', streamId] });
        },
        onError: (error) => {
            console.error('Failed to pin topic:', error);
        },
    });
};

// Hook để unpin một topic
const useUnpinTopic = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ topicId, streamId }: { topicId: string; streamId: number }): Promise<any> => {
            return fetcher(
                {
                    method: HTTPMethod.DELETE,
                    url: `api/v1/topics/${topicId}/pin`,
                    data: { stream_id: streamId },
                },
                { withToken: true }
            );
        },
        onSuccess: (_, { streamId }) => {
            // Invalidate topics query để refetch data mới
            queryClient.invalidateQueries({ queryKey: ['topics', streamId] });
        },
        onError: (error) => {
            console.error('Failed to unpin topic:', error);
        },
    });
};

export { useFetchTopics, usePinTopic, useUnpinTopic };

