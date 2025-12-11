import EditQuestionClient from "../../components/edit-question-client";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const parm = await params;
  console.log(parm, "TES param");
  return <EditQuestionClient id={parm.id} />;
}
