import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { ProjectDetail } from '@/types/sanity';

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');

  if (!projectId) {
    return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
  }

  try {
    const query = `*[_type == "projectDetail" && project._ref == $projectId] | order(order asc) { ${PROJECT_DETAIL_FIELDS} }`;
    const projectDetails = await client.fetch<ProjectDetail[]>(query, { projectId });

    return NextResponse.json(projectDetails);
  } catch (error) {
    console.error('Error fetching project details:', error);
    return NextResponse.json({ error: 'Failed to fetch project details' }, { status: 500 });
  }
}
