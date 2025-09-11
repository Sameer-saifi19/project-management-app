import { getTasks } from "../../actions/tasks";


type ApiTestProps = {
  projectId?: string;
};

export default async function ApiTest({ projectId }: ApiTestProps) {
  if (!projectId) {
    return <p>No projectId provided</p>;
  }

  const result = await getTasks(projectId);

  return (
    <div>
      <h2>API Tester</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
