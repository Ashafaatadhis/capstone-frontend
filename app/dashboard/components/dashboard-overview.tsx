"use client";

import { Sparkle, Activity, ListChecks, Mic } from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
            <p className="mt-1 text-blue-100">
              Here’s what’s happening with your speech analysis platform today.
            </p>
          </div>
          <Sparkle className="h-8 w-8 opacity-80" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardStat
          icon={<Mic className="h-5 w-5 text-blue-600" />}
          label="Total Recordings"
          value="128"
        />
        <DashboardStat
          icon={<ListChecks className="h-5 w-5 text-green-600" />}
          label="Completed Evaluations"
          value="87"
        />
        <DashboardStat
          icon={<Activity className="h-5 w-5 text-purple-600" />}
          label="Active Questions"
          value="14"
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700">
            Create New Question
          </button>
          <button className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700 shadow hover:bg-slate-200">
            Upload Recording
          </button>
          <button className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700 shadow hover:bg-slate-200">
            View Rubrics
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
      </div>
      <div className="rounded-lg bg-slate-100 p-3">{icon}</div>
    </div>
  );
}
