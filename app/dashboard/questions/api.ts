"use client";

export function authHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token ?? ""}`,
  };
}

export async function fetchQuestions() {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}

export async function fetchQuestionById(id: string | number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions/${id}/`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch question by id");
  return res.json();
}

export async function createQuestion(data: { text: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create question");
  return res.json();
}

export async function updateQuestion(id: number, data: { text: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions/${id}/`,
    {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to update question");
  return res.json();
}

export async function deleteQuestion(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions/${id}/`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  if (!res.ok) throw new Error("Failed to delete question");
  return res.json();
}
