import { Suspense } from "react";
import GradingClient from "./grading-client";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GradingClient />
    </Suspense>
  );
}
