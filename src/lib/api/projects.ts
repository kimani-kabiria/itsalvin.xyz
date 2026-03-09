import { client } from "@/sanity/client";
import { Project, ProjectDetail } from "@/types/sanity";

const PROJECT_FIELDS = `
  _id,
  title,
  slug,
  timeline,
  startDate,
  endDate,
  role,
  techStack[]->{
    _id,
    title,
    slug
  },
  featuredImage{
    asset->{_ref},
    alt
  },
  gallery[]{
    asset->{_ref},
    alt
  },
  isFeatured,
  categories[]->{
    _id,
    title
  },
  client,
  status,
  url,
  description
`;

const PROJECT_DETAIL_FIELDS = `
  _id,
  title,
  project->{
    _id,
    title,
    slug,
    featuredImage{
      asset->{_ref},
      alt
    }
  },
  description,
  technologies,
  features,
  challenges,
  order
`;

const options = { next: { revalidate: 30 } };

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(isFeatured desc, startDate desc) { ${PROJECT_FIELDS} }`;
  return await client.fetch(query, {}, options);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`;
  return await client.fetch(query, { slug }, options);
}

export async function getProjectDetails(projectId?: string): Promise<ProjectDetail[]> {
  if (projectId) {
    const query = `*[_type == "projectDetail" && project._ref == $projectId] | order(order asc) { ${PROJECT_DETAIL_FIELDS} }`;
    return await client.fetch(query, { projectId }, options);
  }
  
  const query = `*[_type == "projectDetail"] | order(order asc) { ${PROJECT_DETAIL_FIELDS} }`;
  return await client.fetch(query, {}, options);
}

export async function getProjectDetailsByProject(projectId: string): Promise<ProjectDetail[]> {
  const query = `*[_type == "projectDetail" && project._ref == $projectId] | order(order asc) { ${PROJECT_DETAIL_FIELDS} }`;
  return await client.fetch(query, { projectId }, options);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && isFeatured == true] | order(startDate desc) { ${PROJECT_FIELDS} }`;
  return await client.fetch(query, {}, options);
}

export async function getProjectWithDetails(slug: string): Promise<{
  project: Project | null;
  projectDetails: ProjectDetail[];
}> {
  const project = await getProjectBySlug(slug);
  const projectDetails = project ? await getProjectDetailsByProject(project._id) : [];

  return {
    project,
    projectDetails
  };
}
