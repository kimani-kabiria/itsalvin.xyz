import { useQuery } from "@tanstack/react-query";
import type { ProjectDetail } from "@/types/sanity";

interface ProjectDetailsResponse {
  projectDetails: ProjectDetail[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useProjectDetails(projectId: string): ProjectDetailsResponse {
  const {
    data: projectDetails = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["project-details", projectId],
    queryFn: async () => {
      if (!projectId) return [];

      const response = await fetch(`/api/project-details?projectId=${projectId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }

      return response.json() as Promise<ProjectDetail[]>;
    },
    enabled: !!projectId,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });

  return {
    projectDetails,
    isLoading,
    isError,
    error,
  };
}
