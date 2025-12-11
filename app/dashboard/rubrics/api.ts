"use client";

export function authHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token ?? ""}`,
  };
}

export async function fetchRubricsByQuestion(questionId: string | number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rubrics/question/${questionId}`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch rubrics");
  return res.json();
}

export async function fetchRubricById(id: string | number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rubrics/${id}`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch rubric by id");
  return res.json();
}

export async function createRubricForQuestion(
  questionId: string | number,
  data: { score: number; description: string }
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rubrics/question/${questionId}`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to create rubric");
  return res.json();
}

export async function updateRubricForQuestion(
  id: string | number,
  data: { score: number; description: string }
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rubrics/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update rubric");
  return res.json();
}

export async function deleteRubric(id: string | number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rubrics/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete rubric");
  return res.json();
}
