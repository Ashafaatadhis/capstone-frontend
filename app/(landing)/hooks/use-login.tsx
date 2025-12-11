"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      return res.json();
    },

    onSuccess: (data, variables) => {
      // Simpan token
      console.log(data.access_token, "LOGIN SUCCESS DATA");
      localStorage.setItem("token", data.access_token);
      // Set cookie agar middleware bisa baca
      document.cookie = `token=${data.access_token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }`;
      // Simpan info user dasar untuk UI
      if (variables?.username) {
        localStorage.setItem("user_name", variables.username);
        // Jika backend belum kirim email, pakai username sebagai fallback
        localStorage.setItem("user_email", variables.username);
      }

      // Redirect ke dashboard
      router.push("/dashboard");
    },

    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });
}
