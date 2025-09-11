import ApiTest from "@/components/apitester";

export default async function Dashboard({ searchParams }: { searchParams: { projectId?: string } }) {
    const params = await searchParams;
  const projectId = params.projectId;

  return (
    <div>
      <h1>Dashboard</h1>
      <ApiTest projectId={projectId} />
    </div>
  );
}
