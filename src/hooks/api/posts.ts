import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/types/sanity";

interface PostsParams {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}

interface PostsResponse {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function usePosts(params: PostsParams = {}): PostsResponse {
  const { limit = 6, skip = 0, category, search } = params;

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", { limit, skip, category, search }],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
      });

      if (category) {
        searchParams.append("category", category);
      }

      if (search) {
        searchParams.append("search", search);
      }

      const response = await fetch(`/api/posts?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      return response.json() as Promise<Post[]>;
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: false,
  });

  return {
    posts,
    isLoading,
    isError,
    error,
  };
}
