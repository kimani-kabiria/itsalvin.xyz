import { client } from "@/sanity/client";
import { ProjectsPage } from "@/components/projects/ProjectsPage";
import { getProjects } from "@/lib/api/projects";

const options = { next: { revalidate: 30 } };

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <ProjectsPage projects={projects} />
      </div>
    </main>
  );
}
