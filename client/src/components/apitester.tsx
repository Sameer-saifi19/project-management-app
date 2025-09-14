"use client";

import { useGetProjectsQuery } from "@/app/service/api";

export default function ProjectList() {
  const { data: projects, isLoading, error } = useGetProjectsQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects</p>;

  return (
    <ul>
      {projects?.map((p: any) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
