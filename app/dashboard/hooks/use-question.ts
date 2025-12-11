"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchQuestions,
  fetchQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../questions/api";

// Get list
export function useQuestions() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });
}

// Get detail
export function useQuestion(id: number) {
  return useQuery({
    queryKey: ["questions", id],
    queryFn: () => fetchQuestionById(id),
    enabled: !!id,
  });
}

// Create
export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

// Update
export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { text: string } }) =>
      updateQuestion(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["questions", id] });
    },
  });
}

// Delete
export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}
