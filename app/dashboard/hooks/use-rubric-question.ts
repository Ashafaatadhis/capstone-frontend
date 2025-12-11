"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchRubricsByQuestion,
  createRubricForQuestion,
  updateRubricForQuestion,
  deleteRubric,
  fetchRubricById,
} from "@/app/dashboard/rubrics/api";

export function useRubricsByQuestion(questionId: string | number) {
  return useQuery({
    queryKey: ["rubrics", questionId],
    queryFn: () => fetchRubricsByQuestion(questionId),
  });
}

export function useRubricById(id: string | number) {
  return useQuery({
    queryKey: ["rubric", id],
    queryFn: () => fetchRubricById(id),
    enabled: !!id,
  });
}

export function useCreateRubricForQuestion(questionId: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createRubricForQuestion(questionId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rubrics", questionId] });
    },
  });
}

export function useUpdateRubricForQuestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: any) => updateRubricForQuestion(id, data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["rubrics", variables.questionId] });
    },
  });
}

export function useDeleteRubric(questionId: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteRubric,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rubrics", questionId] });
    },
  });
}
