import { useQuery } from "@tanstack/react-query";
import { fetcher, HTTPMethod } from "config/api";

const url = {
    me: "api/v1/streams",
    get_messages: "api/v1/messages",
};

const useFetchStreams = () => {
    return useQuery({
        queryKey: ["streams"],
        queryFn: (): Promise<any> => {
            const response = fetcher({
                method: HTTPMethod.GET,
                url: url.me,
            });
            return response;
        },
    });
};

const useFetchMessages = (channelId?: number, topicName?: string) => {
    return useQuery({
        queryKey: ["messages", channelId, topicName],
        queryFn: (): Promise<any> => {
            const response = fetcher({
                method: HTTPMethod.GET,
                url: url.get_messages,
                params: { anchor: "newest", num_before: 60, num_after: 150, narrow: `[{"negated":false,"operator":"channel","operand":${channelId}},{"operator":"topic","operand":"${topicName}"}]` },
            });
            return response;
        },
        enabled: !!channelId && !!topicName,
    });
};

export { useFetchStreams, useFetchMessages };