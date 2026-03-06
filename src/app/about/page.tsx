import { client } from "@/sanity/client";
import { Experience as ExperienceType } from "@/types/sanity";
import AboutClient from "./AboutClient";

const EXPERIENCES_QUERY = `*[_type == "experience"] | order(row asc) {
  _id,
  company,
  role,
  years,
  row,
  colStart,
  colSpan
}`;

const options = { next: { revalidate: 30 } };

export default async function AboutPage() {
  const experiences = await client.fetch<ExperienceType[]>(EXPERIENCES_QUERY, {}, options);

  return <AboutClient experiences={experiences} />;
}