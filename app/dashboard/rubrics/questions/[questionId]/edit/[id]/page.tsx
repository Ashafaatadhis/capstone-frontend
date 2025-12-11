import EditRubricQuestionClient from "@/app/dashboard/rubrics/components/edit-rubric-question-client";

export default async function EditRubricPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const parm = await params;

  return <EditRubricQuestionClient rubricId={parm.id} />;
}
