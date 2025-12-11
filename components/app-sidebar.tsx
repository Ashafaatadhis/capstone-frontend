"use client";

import * as React from "react";
import { MessageSquare, BookOpen, Clapperboard } from "lucide-react";
import { jwtDecode } from "jwt-decode";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  teams: [
    {
      name: "Intervox",
      logo: MessageSquare,
      plan: "Team",
    },
  ],
  navMain: [
    {
      title: "Questions",
      url: "/dashboard/questions",
      icon: MessageSquare,
      isActive: true,
      items: [
        {
          title: "All Questions",
          url: "/dashboard/questions",
        },
        {
          title: "Create Question",
          url: "/dashboard/questions/create",
        },
      ],
    },
    {
      title: "Rubrics",
      url: "/dashboard/rubrics",
      icon: BookOpen,
      items: [
        {
          title: "All Rubrics",
          url: "/dashboard/rubrics",
        },
        {
          title: "Create Rubric",
          url: "/dashboard/rubrics/create",
        },
      ],
    },
    {
      title: "Grading",
      url: "/grading",
      icon: Clapperboard,
      items: [
        {
          title: "Upload & Grade",
          url: "/grading",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState({
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    let name: string | null = null;
    let email: string | null = null;

    // Try to read name/email directly from JWT payload if present
    if (token) {
      try {
        const decoded: { name?: string; username?: string; email?: string } =
          jwtDecode(token);

        console.log(decoded, "DECODED TOKEN PAYLOAD");
        name = decoded?.name || decoded?.username || null;
        email = decoded?.email || null;
      } catch (err) {
        console.warn("Failed to decode token payload", err);
      }
    }

    // Fallback to any stored values if token lacks those fields
    if (!name) name = localStorage.getItem("user_name");
    if (!email) email = localStorage.getItem("user_email");

    setUser((prev) => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email,
    }));
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
