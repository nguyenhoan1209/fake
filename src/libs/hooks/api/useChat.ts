import { useQuery } from "@tanstack/react-query";
import { fetcher, HTTPMethod } from "config/api";

const url = {
  me: "api/v1/streams",
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
export { useFetchStreams };