"use client";

import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useDeleteRubric } from "../../hooks/use-rubric-question";
import { Loader2 } from "lucide-react";

export function DeleteRubricDialog({
  open,
  onOpenChange,
  id,
  questionId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  id: number | null;
  questionId: string;
}) {
  // ID dimasukkan saat hook dipanggil
  const deleteMutation = useDeleteRubric(questionId);
  const [isPending, startTransition] = useTransition();

  if (!id) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Rubric?</AlertDialogTitle>
        </AlertDialogHeader>

        <p className="text-sm text-muted-foreground">
          This rubric will be permanently deleted. This action cannot be undone.
        </p>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending || deleteMutation.isPending}
            onClick={() =>
              startTransition(() => {
                deleteMutation.mutate(id, {
                  onSuccess: () => {
                    onOpenChange(false);
                    // Ensure fresh data after delete
                    deleteMutation.reset();
                  },
                });
              })
            }
          >
            {isPending || deleteMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
