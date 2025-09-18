import { useQuery, useMutation } from "@tanstack/react-query";
import { fetcher, HTTPMethod } from "config/api";
import { ChatMessageData } from "components/Chat/ChatMessage";

const url = {
    me: "api/v1/streams",
    get_messages: "api/v1/messages",
    send_message: "api/v1/messages",
};

// Zulip message interface
interface ZulipMessage {
    id: number;
    content: string;
    timestamp: number;
    sender_id: number;
    sender_full_name: string;
    avatar_url?: string;
    subject?: string;
    type: string;
}

interface ZulipMessagesResponse {
    messages: ZulipMessage[];
    result: string;
    msg?: string;
}

// Transform Zulip message to ChatMessageData
const transformZulipMessage = (zulipMessage: ZulipMessage): ChatMessageData => {
    return {
        id: zulipMessage.id.toString(),
        content: zulipMessage.content,
        timestamp: new Date(zulipMessage.timestamp * 1000), // Zulip timestamp is in seconds
        sender: {
            id: zulipMessage.sender_id.toString(),
            name: zulipMessage.sender_full_name,
            avatar: zulipMessage.avatar_url,
        },
        attachments: [], // TODO: Handle attachments if needed
    };
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
        queryFn: async (): Promise<ChatMessageData[]> => {
            const response: ZulipMessagesResponse = await fetcher({
                method: HTTPMethod.GET,
                url: url.get_messages,
                params: { 
                    anchor: "newest", 
                    num_before: 60, 
                    num_after: 150, 
                    narrow: `[{"negated":false,"operator":"channel","operand":${channelId}},{"operator":"topic","operand":"${topicName}"}]` 
                },
            });
            
            // Transform Zulip messages to ChatMessageData format
            if (response.result === 'success' && response.messages) {
                return response.messages.map(transformZulipMessage);
            }
            
            return [];
        },
        enabled: !!channelId && !!topicName,
    });
};

const useSendMessage = () => {
    return useMutation({
        mutationFn: (body: any): Promise<any> =>
            fetcher(
                {
                    method: HTTPMethod.POST,
                    url: url.get_messages,
                    data: body,
                },
                { isFormData: false, withToken: true },
            ),
        onSuccess: async () => {
            
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onError: (error: any) => {
            
        },
    });
}

export { useFetchStreams, useFetchMessages, transformZulipMessage, useSendMessage };