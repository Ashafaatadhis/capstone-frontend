"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGradeVideo } from "../dashboard/hooks/use-grade";
import {
  Loader2,
  UploadCloud,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useQuestions } from "../dashboard/hooks/use-question";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GradeResult = {
  job_id?: string;
  status?: "completed" | "error";
  result?: any;
  message?: string;
  question_id?: number;
};

const ACCEPTED_VIDEO =
  ".mp4,.mov,.mkv,.avi,.webm,video/mp4,video/quicktime,video/x-matroska,video/x-msvideo,video/webm";

export default function GradingPage() {
  const gradeMutation = useGradeVideo();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [callbackUrl, setCallbackUrl] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [polling, setPolling] = useState(false);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [shareUrl, setShareUrl] = useState("");

  const { data: questionData, isLoading: isLoadingQuestions } = useQuestions();
  const questions = questionData?.data ?? [];

  // Hardcode callback URL (env override, otherwise same site)
  useEffect(() => {
    const envCb = process.env.NEXT_PUBLIC_CALLBACK_URL;
    if (envCb) {
      setCallbackUrl(envCb);
    } else if (typeof window !== "undefined") {
      setCallbackUrl(`${window.location.origin}/api/grade-callback`);
    }
  }, []);

  // If page loaded with ?job_id=..., start polling
  useEffect(() => {
    const existingJob = searchParams.get("job_id");
    if (existingJob) {
      setJobId(existingJob);
      setPolling(true);
    }
  }, [searchParams]);

  // Sync URL with current job id
  useEffect(() => {
    if (!router) return;
    if (jobId) {
      router.replace(`/grading?job_id=${jobId}`);
    } else {
      router.replace("/grading");
    }
  }, [jobId, router]);

  // Build shareable link when job id changes
  useEffect(() => {
    if (typeof window === "undefined" || !jobId) {
      setShareUrl("");
      return;
    }
    setShareUrl(`${window.location.origin}/grading?job_id=${jobId}`);
  }, [jobId]);

  const handleSubmit = () => {
    if (!file || !callbackUrl || !questionId) return;
    setResult(null);
    gradeMutation.mutate(
      { file, callbackUrl, questionId },
      {
        onSuccess: (res) => {
          const id = res?.data?.job_id;
          if (id) {
            setJobId(id);
            setPolling(true);
          }
        },
      }
    );
  };

  const isLoading = gradeMutation.isPending;

  // Polling fetched result from callback storage
  useEffect(() => {
    if (!jobId || !polling) return;

    const interval = setInterval(async () => {
      try {
        const resp = await fetch(`/api/grade-callback?job_id=${jobId}`);
        if (resp.status === 404) return;
        const json = await resp.json();
        const data = json?.data as GradeResult | undefined;
        if (data) {
          setResult(data);
          setPolling(false);
        }
      } catch (err) {
        console.error("Polling callback failed", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId, polling]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-cyan-50 p-6">
      <div className="mx-auto w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload Video for Grading</CardTitle>
            <CardDescription>
              Upload a video file; the backend will grade in the background and
              POST the result back to this site automatically.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {gradeMutation.isError && (
              <p className="text-sm text-red-600">
                {(gradeMutation.error as Error).message}
              </p>
            )}

            {jobId && !result && (
              <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                <div className="flex items-center justify-between gap-3">
                  <span>
                    Grading started. Job ID:{" "}
                    <span className="font-semibold">{jobId}</span>
                  </span>
                  {shareUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigator.clipboard?.writeText(shareUrl)}
                    >
                      Copy link
                    </Button>
                  )}
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-3 rounded-md border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  {result.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Status: {result.status}
                    </p>
                    {result.message && (
                      <p className="text-xs text-slate-600">{result.message}</p>
                    )}
                  </div>
                  {shareUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-auto"
                      onClick={() => navigator.clipboard?.writeText(shareUrl)}
                    >
                      Copy link
                    </Button>
                  )}
                </div>

                {result.result && (
                  <div className="space-y-4 rounded-md bg-slate-50 p-4 text-sm text-slate-800">
                    {/* QUESTION */}
                    <div>
                      <h3 className="font-semibold text-slate-900">Question</h3>
                      <p>{result.result.question}</p>
                    </div>

                    {/* ANSWER / TRANSCRIPT */}
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Transcript (Answer)
                      </h3>
                      <p className="whitespace-pre-wrap">
                        {result.result.transcript}
                      </p>
                    </div>

                    {/* LLM RESULT */}
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        LLM Scoring
                      </h3>
                      <div className="rounded-md bg-white p-3 border">
                        <p>
                          <span className="font-semibold">Score:</span>{" "}
                          {result.result.llm_result.score}
                        </p>
                        <p className="mt-2">
                          <span className="font-semibold">Reason:</span>
                          <br />
                          {result.result.llm_result.reason}
                        </p>
                      </div>
                    </div>

                    {/* SPEECH ANALYSIS */}
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Speech Analysis
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <p>
                          <b>WPM:</b> {result.result.speech_analysis.wpm}
                        </p>
                        <p>
                          <b>Total Speech Time:</b>{" "}
                          {result.result.speech_analysis.total_speech_time}s
                        </p>
                        <p>
                          <b>Total Pause Time:</b>{" "}
                          {result.result.speech_analysis.total_pause_time}s
                        </p>
                        <p>
                          <b>Pauses:</b>{" "}
                          {result.result.speech_analysis.number_of_pauses}
                        </p>
                        <p>
                          <b>Avg Pause:</b>{" "}
                          {result.result.speech_analysis.average_pause_duration}
                          s
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-800">
                Video file
              </label>
              <div className="flex flex-col gap-3 rounded-lg border border-dashed border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-slate-600">
                  <UploadCloud className="h-5 w-5 text-slate-500" />
                  <span className="text-sm font-medium">Choose file</span>
                </div>
                <Input
                  type="file"
                  accept={ACCEPTED_VIDEO}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setFile(f ?? null);
                  }}
                />
              </div>
              <p className="text-xs text-slate-500">
                Allowed: mp4, mov, mkv, avi, webm. File is sent as
                multipart/form-data.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-800">
                Select Question
              </label>
              <Select
                value={questionId ? String(questionId) : undefined}
                onValueChange={(val) => setQuestionId(Number(val))}
                disabled={isLoadingQuestions}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      isLoadingQuestions ? "Loading..." : "Choose a question"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {questions.map((q: any) => (
                    <SelectItem key={q.id} value={String(q.id)}>
                      {q.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                Video will be graded against this question and its rubrics.
              </p>
            </div>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!file || !callbackUrl || !questionId || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading & starting grading...
                </span>
              ) : (
                "Start Grading"
              )}
            </Button>

            {jobId && (
              <Button
                type="button"
                variant="outline"
                disabled={!jobId || polling}
                onClick={() => setPolling(true)}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {polling ? "Waiting for callback..." : "Refresh status"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
