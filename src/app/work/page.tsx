import { client } from "@/sanity/client";
import { ProjectsPage } from "@/components/projects/ProjectsPage";
import { getProjects } from "@/lib/api/projects";

const options = { next: { revalidate: 30 } };

export default async function WorkPage() {
  const projects = await getProjects();

  return <ProjectsPage projects={projects} />;
}
