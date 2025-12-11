"use client";

import { useMutation } from "@tanstack/react-query";

type GradePayload = {
  file: File;
  callbackUrl: string;
  questionId: number;
};

export function useGradeVideo() {
  return useMutation({
    mutationFn: async ({ file, callbackUrl, questionId }: GradePayload) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("callback_url", callbackUrl);
      formData.append("question_id", String(questionId));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grade/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to start grading");
      }

      return res.json() as Promise<{
        data?: { job_id?: string };
        message?: string;
      }>;
    },
  });
}
