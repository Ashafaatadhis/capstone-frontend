"use client";

import { useRubricById } from "../../hooks/use-rubric-question";
import { RubricQuestionForm } from "./rubric-question-form";

export default function EditRubricQuestionClient({
  rubricId,
}: {
  rubricId: string;
}) {
  const { data, isLoading, error } = useRubricById(rubricId);

  if (isLoading) return <p>Loading rubric...</p>;
  if (error) return <p>Error fetching rubric</p>;

  const rubric = data?.data;

  if (!rubric) return <p>Rubric not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Rubric #{rubricId}</h1>

      <RubricQuestionForm
        id={rubric.id}
        questionId={rubric.question_id}
        defaultValues={{
          score: rubric.score,
          description: rubric.description,
        }}
        onSuccess={() => {
          window.location.href = `/dashboard/rubrics/questions/${rubric.question_id}`;
        }}
      />
    </div>
  );
}
