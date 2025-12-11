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
import { useDeleteQuestion } from "../../hooks/use-question";
import { Loader2 } from "lucide-react";

export function DeleteDialog({
  open,
  onOpenChange,
  id,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: number | null;
}) {
  const deleteMutation = useDeleteQuestion();
  const [isPending, startTransition] = useTransition();

  if (!id) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>

        <p className="text-sm text-muted-foreground">
          This action cannot be undone. This question will be permanently
          deleted.
        </p>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                deleteMutation.mutate(id, {
                  onSuccess: () => {
                    onOpenChange(false); // close modal
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
