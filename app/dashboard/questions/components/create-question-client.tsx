"use client";

import { QuestionForm } from "../components/question-form";

export default function CreateQuestionClient() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Question</h1>

      <QuestionForm
        onSuccess={() => {
          window.location.href = "/dashboard/questions";
        }}
      />
    </div>
  );
}
