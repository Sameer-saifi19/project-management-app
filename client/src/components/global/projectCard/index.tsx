"use client";

import { getTasks } from "@/actions/task";
import { useQuery } from "@tanstack/react-query";

const ProjectCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getTasks,
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h2>{(error as Error).message}</h2>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProjectCard;
