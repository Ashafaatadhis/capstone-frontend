"use client";

import { useQuery } from "@tanstack/react-query";
import { QuestionForm } from "./question-form";
import { fetchQuestionById } from "../api";

export default function EditQuestionClient({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["question", id],
    queryFn: () => fetchQuestionById(id),
  });

  if (isLoading) return <p>Loading question...</p>;
  if (error) return <p>Error loading question.</p>;

  const question = data.data;
  console.log(question, "TES question data");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Question</h1>

      <QuestionForm
        id={question.id}
        defaultValues={{ text: question.text }}
        onSuccess={() => {
          window.location.href = "/dashboard/questions";
        }}
      />
    </div>
  );
}
