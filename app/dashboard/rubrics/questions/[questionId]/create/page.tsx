import CreateRubricClient from "../../../components/create-rubric-question-client";

export default async function CreateRubricPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const parm = await params;
  return <CreateRubricClient questionId={parm.questionId} />;
}
