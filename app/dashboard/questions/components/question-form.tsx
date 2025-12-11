"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateQuestion, useUpdateQuestion } from "../../hooks/use-question";
import { Loader2 } from "lucide-react";

const schema = z.object({
  text: z.string().min(5, "Question text is required"),
});

export function QuestionForm({
  defaultValues,
  onSuccess,
  id,
}: {
  defaultValues?: { text: string };
  id?: number;
  onSuccess: () => void;
}) {
  const createMutation = useCreateQuestion();
  const updateMutation = useUpdateQuestion();

  const form = useForm({
    defaultValues: defaultValues || { text: "" },
    validators: { onSubmit: schema },
    onSubmit: async ({ value }) => {
      if (id) {
        await updateMutation.mutateAsync({ id, data: value });
      } else {
        await createMutation.mutateAsync(value);
      }
      onSuccess();
    },
  });

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="text">
        {(field) => (
          <div className="space-y-2">
            <Input
              placeholder="Enter question text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors?.[0]?.message && (
              <p className="text-red-500 text-sm">
                {field.state.meta.errors[0].message}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </span>
        ) : (
          id ? "Update Question" : "Create Question"
        )}
      </Button>
    </form>
  );
}
