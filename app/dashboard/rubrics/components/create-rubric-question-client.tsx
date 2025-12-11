"use client";

import { RubricQuestionForm } from "./rubric-question-form";

export default function CreateRubricClient({
  questionId,
}: {
  questionId: string;
}) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Create Rubric for Question #{questionId}
      </h1>

      <RubricQuestionForm
        questionId={questionId}
        onSuccess={() => {
          window.location.href = `/dashboard/rubrics/questions/${questionId}`;
        }}
      />
    </div>
  );
}
