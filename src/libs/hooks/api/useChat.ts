import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, HTTPMethod } from "config/api";
import { ChatMessageData } from "components/Chat/ChatMessage";
import { useEffect, useRef, useState } from "react";

const url = {
  me: "api/v1/streams",
  get_messages: "api/v1/messages",
  send_message: "api/v1/messages",
    add_reaction: "api/v1/messages",
    remove_reaction: "api/v1/messages",
  events: "api/v1/events",
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
    reactions?: Array<{
        emoji_name: string;
        emoji_code: string;
        reaction_type: string;
        user_id: number;
    }>;
}

// Transform Zulip message to ChatMessageData
const transformZulipMessage = (zulipMessage: ZulipMessage): ChatMessageData => {
  console.log('Transforming Zulip message:', zulipMessage);
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
    reactions: zulipMessage.reactions || [], // Map reactions from Zulip
  };
};

const useFetchStreams = () => {
  return useQuery({
    queryKey: ["streams"],
    queryFn: (): Promise<unknown> => {
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
            
            console.log('API Response:', response);
            
            // Transform Zulip messages to ChatMessageData format
            if (response.result === 'success' && response.messages) {
                const transformedMessages = response.messages.map(transformZulipMessage);
                console.log('Transformed messages:', transformedMessages);
                return transformedMessages;
            }
            
            return [];
        },
    enabled: !!channelId && !!topicName,
  });
};

const useSendMessage = () => {
  return useMutation({
    mutationFn: (body: Record<string, unknown>): Promise<unknown> =>
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
    onError: (error: unknown) => {
      console.error('Failed to send message:', error);
    },
  });
}
const useAddReaction = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ messageId, reactionData }: { messageId: number; reactionData: ReactionRequest }): Promise<any> => {
            // Convert object to URLSearchParams for form data
            const formData = new FormData();
            formData.append('emoji_name', reactionData.emoji_name);
            if (reactionData.emoji_code) {
                formData.append('emoji_code', reactionData.emoji_code);
            }
            if (reactionData.reaction_type) {
                formData.append('reaction_type', reactionData.reaction_type);
            }
            
            return fetcher(
                {
                    method: HTTPMethod.POST,
                    url: `${url.add_reaction}/${messageId}/reactions`,
                    data: formData,
                },
                { isFormData: true, withToken: true },
            );
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        },
        onError: (error: any) => {
        },
    });
}
const useRemoveReaction = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ messageId, reactionData }: { messageId: number; reactionData: ReactionRequest }): Promise<any> => {
            // Convert object to URLSearchParams for form data
            const formData = new URLSearchParams();
            formData.append('emoji_name', reactionData.emoji_name);
            if (reactionData.emoji_code) {
                formData.append('emoji_code', reactionData.emoji_code);
            }
            if (reactionData.reaction_type) {
                formData.append('reaction_type', reactionData.reaction_type);
            }
            
            return fetcher(
                {
                    method: HTTPMethod.DELETE,
                    url: `${url.remove_reaction}/${messageId}/reactions`,
                    data: formData,
                },
                { isFormData: true, withToken: true },
            );
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        },
        onError: (error: any) => {
        },
    });
}


interface LongLiveQueryParams {
  dont_block?: boolean;
  last_event_id: number;
  queue_id?: string;
  client_gravatar?: boolean;
  slim_presence?: boolean;
  [key: string]: unknown;
}

interface LongLiveQueryOptions<T = unknown> {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: T, last_event_id: number) => void;
  onError?: (error: unknown, last_event_id: number) => void;
}

const useLongLiveQuery = <T = unknown>(
  queryKey: string[],
  endpoint: string,
  initialParams: any,
  options: LongLiveQueryOptions<T> = {}
) => {
  const {
    enabled = true, // Let the effect control polling instead of a static check
    refetchInterval = 1000,
    onSuccess,
    onError,
  } = options;

  const [currentParams, setCurrentParams] = useState(initialParams);
  const [isPending, setIsPending] = useState(false);
  const retryCountRef = useRef(0);
  const lastSuccessfulIdRef = useRef(initialParams.last_event_id ?? -1);
  const shouldPollRef = useRef(false);
  const initialParamsRef = useRef(initialParams);

  // Update polling state dynamically based on queue_id
  useEffect(() => {
    shouldPollRef.current = Boolean(initialParams.queue_id);
    setCurrentParams(initialParams);
  }, [initialParams.queue_id]);

  const query = useQuery({
    queryKey: [...queryKey, currentParams.last_event_id],
    queryFn: async (): Promise<T> => {
      if (!currentParams.queue_id) {
        throw new Error("Queue ID is undefined. Cannot start long polling.");
      }
      setIsPending(true);
      const response = await fetcher({
        method: HTTPMethod.GET,
        url: endpoint,
        params: { ...currentParams },
      });
      setIsPending(false);
      return response as T;
    },
    enabled: enabled && shouldPollRef.current,
    refetchInterval: false,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  // Auto-polling
  useEffect(() => {
    if (!enabled || !shouldPollRef.current) return;
    const pollInterval = setInterval(() => {
      if (!query.isFetching && !isPending) {
        query.refetch();
      }
    }, refetchInterval);
    return () => clearInterval(pollInterval);
  }, [enabled, query.isFetching, isPending, refetchInterval, query]);

  useEffect(() => {
    if (query.isSuccess && query.data) {
      retryCountRef.current = 0;
      lastSuccessfulIdRef.current = currentParams.last_event_id;
      onSuccess?.(query.data, currentParams.last_event_id);
      setCurrentParams({
        ...initialParamsRef.current,
        ...currentParams,
        last_event_id: currentParams.last_event_id + 1,
      });
    }
  }, [query.isSuccess, query.data, currentParams, onSuccess, query]);

  useEffect(() => {
    if (query.isError && enabled) {
      setIsPending(false);
      retryCountRef.current += 1;
      onError?.(query.error, currentParams.last_event_id);

      if (retryCountRef.current < 5) {
        setTimeout(() => {
          if (shouldPollRef.current && !query.isFetching) {
            query.refetch();
          }
        }, 90000);
      }
    }
  }, [query.isError, query.error, enabled, currentParams.last_event_id, onError, query]);

  const updateParams = (newParams: Partial<typeof initialParams>) => {
    setCurrentParams(prev => ({ ...prev, ...newParams }));
    if (newParams.queue_id) shouldPollRef.current = true;
  };

  const resetToId = (last_event_id: number) => {
    retryCountRef.current = 0;
    setCurrentParams(prev => ({ ...prev, last_event_id }));
  };

  const startPolling = () => {
    shouldPollRef.current = true;
    if (!query.isFetching) query.refetch();
  };

  const stopPolling = () => {
    shouldPollRef.current = false;
    setIsPending(false);
  };

  return {
    ...query,
    currentParams,
    retryCount: retryCountRef.current,
    lastSuccessfulId: lastSuccessfulIdRef.current,
    isPending: isPending || query.isFetching,
    isPolling: shouldPollRef.current,
    updateParams,
    resetToId,
    startPolling,
    stopPolling,
  };
};



const usePollingEvent = (initiallast_event_id: number = -1, queue_id?: string) => {
  return useLongLiveQuery<ZulipEventsResponse>(
    ['event-polling', queue_id || ''],
    url.events,
    {
      dont_block: false,
      last_event_id: initiallast_event_id,
      queue_id: queue_id,
      client_gravatar: true,
      slim_presence: true,
    },
    {
      enabled: !!queue_id,
      refetchInterval: 1000 * 90,
      onSuccess: (data, last_event_id) => {
        console.log(`Received ${data?.events?.length || 0} new events from ID ${last_event_id}`);
      },
      onError: (error, last_event_id) => {
        console.warn(`Failed to fetch events from ID ${last_event_id}:`, error);
      }
    }
  );
};

export { useFetchStreams, useFetchMessages, transformZulipMessage, useSendMessage, useAddReaction, useRemoveReaction, useLongLiveQuery, usePollingEvent };