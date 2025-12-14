"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  useCreateRubricForQuestion,
  useUpdateRubricForQuestion,
} from "../../hooks/use-rubric-question";
import { Loader2 } from "lucide-react";

const schema = z.object({
  score: z.number().min(0).max(4),
  description: z.string().min(10, "Description is required"),
});

export function RubricQuestionForm({
  defaultValues,
  onSuccess,
  questionId,
  id,
}: {
  defaultValues?: { score: number; description: string };
  id?: string | number;
  questionId: string | number;
  onSuccess: () => void;
}) {
  const createMutation = useCreateRubricForQuestion(questionId);
  const updateMutation = useUpdateRubricForQuestion();

  const form = useForm({
    defaultValues: defaultValues || { score: 1, description: "" },
    validators: { onSubmit: schema },
    onSubmit: async ({ value }) => {
      if (id) {
        await updateMutation.mutateAsync({ id, data: value, questionId });
      } else {
        await createMutation.mutateAsync(value);
      }
      onSuccess();
    },
  });

  const loading = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="score">
        {(field) => (
          <Input
            type="number"
            min={0}
            max={4}
            value={field.state.value}
            onChange={(e) => field.handleChange(Number(e.target.value))}
          />
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <Textarea
            placeholder="Enter rubric description..."
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>

      <Button disabled={loading} type="submit" className="w-full">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </span>
        ) : id ? (
          "Update Rubric"
        ) : (
          "Create Rubric"
        )}
      </Button>
    </form>
  );
}
