"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { DeleteDialog } from "./delete-dialog";
import { useQuestions, useDeleteQuestion } from "../../hooks/use-question";

export function QuestionsClient() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const { data, isLoading, error } = useQuestions();
  const deleteMutation = useDeleteQuestion();

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 text-center text-muted-foreground">Loading...</div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Failed to load questions.
      </div>
    );
  }

  const questions = data?.data ?? [];

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>All Questions</CardTitle>

        {/* CREATE BUTTON */}
        <Button asChild>
          <Link href="/dashboard/questions/create">Add Question</Link>
        </Button>
      </CardHeader>

      <CardContent>
        {questions.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            No questions found.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Text</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {questions.map((q: any) => {
                const formatted = new Date(q.created_at).toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                return (
                  <TableRow key={q.id}>
                    <TableCell>{q.text}</TableCell>
                    <TableCell>{formatted}</TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          {/* RUTING KE RUBRICS */}
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/rubrics/questions/${q.id}`}
                            >
                              View Rubrics
                            </Link>
                          </DropdownMenuItem>
                          {/* EDIT */}
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/questions/${q.id}/edit`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>

                          {/* DELETE */}
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => {
                              setDeleteId(q.id);
                              setOpenDelete(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        id={deleteId}
      />
    </Card>
  );
}
