import RubricQuestionClient from "../../components/rubric-question-client";

export default async function RubricQuestionPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const parm = await params;
  return <RubricQuestionClient questionId={parm.questionId} />;
}
