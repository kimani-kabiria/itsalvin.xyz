import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { WorkDetail } from '@/types/sanity';

const WORK_DETAIL_FIELDS = `
  _id,
  title,
  experience->{
    _id,
    company,
    role
  },
  description,
  technologies,
  achievements,
  order
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const experienceId = searchParams.get('experienceId');

  if (!experienceId) {
    return NextResponse.json({ error: 'experienceId is required' }, { status: 400 });
  }

  try {
    const query = `*[_type == "workDetail" && experience._ref == $experienceId] | order(order asc) { ${WORK_DETAIL_FIELDS} }`;
    const workDetails = await client.fetch<WorkDetail[]>(query, { experienceId });

    return NextResponse.json(workDetails);
  } catch (error) {
    console.error('Error fetching work details:', error);
    return NextResponse.json({ error: 'Failed to fetch work details' }, { status: 500 });
  }
}
