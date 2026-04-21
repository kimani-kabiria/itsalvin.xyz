import { useQuery } from "@tanstack/react-query";
import type { WorkDetail } from "@/types/sanity";

interface WorkDetailsResponse {
  workDetails: WorkDetail[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useWorkDetails(experienceId: string): WorkDetailsResponse {
  const {
    data: workDetails = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["work-details", experienceId],
    queryFn: async () => {
      if (!experienceId) return [];

      const response = await fetch(`/api/work-details?experienceId=${experienceId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch work details");
      }

      return response.json() as Promise<WorkDetail[]>;
    },
    enabled: !!experienceId,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });

  return {
    workDetails,
    isLoading,
    isError,
    error,
  };
}
