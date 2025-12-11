"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { useRubricsByQuestion } from "../../hooks/use-rubric-question";
import { DeleteRubricDialog } from "./delete-rubric-dialog";

export default function RubricQuestionClient({
  questionId,
}: {
  questionId: string;
}) {
  const { data, isLoading } = useRubricsByQuestion(questionId);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  if (isLoading) return <p>Loading Rubrics...</p>;
  const rubrics = data?.data ?? [];

  return (
    <div className="p-4 w-full">
      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <CardTitle>Rubrics for Question #{questionId}</CardTitle>

          <Link href={`/dashboard/rubrics/questions/${questionId}/create`}>
            <Button>Add Rubric</Button>
          </Link>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Score</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rubrics?.map((rubric: any) => (
                <TableRow key={rubric.id}>
                  <TableCell>{rubric.score}</TableCell>
                  <TableCell>{rubric.description}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/rubrics/questions/${questionId}/edit/${rubric.id}`}
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setDeleteId(rubric.id);
                            setOpenDelete(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <DeleteRubricDialog
          open={openDelete}
          onOpenChange={setOpenDelete}
          id={deleteId}
          questionId={questionId}
        />
      </Card>
    </div>
  );
}
