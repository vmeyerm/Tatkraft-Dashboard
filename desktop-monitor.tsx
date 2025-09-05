"use client"

import type React from "react"
import { useState } from "react"
import {
  Mail,
  Calendar,
  FileText,
  CheckCircle2,
  ClipboardCheck,
  Users,
  TrendingUp,
  Clock,
  BarChart3,
  Activity,
  Target,
  DollarSign,
  Filter,
  Map,
  Sparkles,
  Brain,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Trophy,
} from "lucide-react"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts"

interface DashboardCard {
  id: string
  title: string
  icon: React.ReactNode
  content: React.ReactNode
  priority: "high" | "medium" | "low"
  effort: "high" | "medium" | "low"
  category: "comms" | "documents" | "calendar" | "team" | "tasks" | "sales"
  x?: number
  y?: number
}

interface MetricCard {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

interface IndividualTask {
  id: string
  title: string
  category: "comms" | "documents" | "calendar" | "team" | "tasks" | "sales"
  priority: "high" | "medium" | "low"
  effort: "high" | "medium" | "low"
  importance: number
  timeLeft: string
  details: string
  type: "message" | "email" | "document" | "meeting" | "task" | "review" | "analytics"
  position?: { x: number; y: number }
}

type ViewMode = "dashboard" | "map"

const executiveMetrics: MetricCard[] = [
  {
    label: "Team Productivity",
    value: "94%",
    change: "+12%",
    trend: "up",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    label: "Response Time",
    value: "2.3h",
    change: "-0.5h",
    trend: "up",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    label: "Active Projects",
    value: "12",
    change: "+3",
    trend: "up",
    icon: <Target className="w-4 h-4" />,
  },
  {
    label: "Revenue Pipeline",
    value: "$2.4M",
    change: "+18%",
    trend: "up",
    icon: <DollarSign className="w-4 h-4" />,
  },
]

const dashboardCards: DashboardCard[] = [
  {
    id: "universal-inbox",
    title: "Universal Inbox",
    priority: "high",
    effort: "low",
    category: "comms",
    x: 20,
    y: 80,
    icon: <Mail className="w-5 h-5 text-blue-400" />,
    content: (
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button className="glass-button-micro px-3 py-1.5 text-xs rounded-full text-white/80 hover:text-white">
            All
          </button>
          <button className="glass-button-micro px-3 py-1.5 text-xs rounded-full text-white/60 hover:text-white">
            Slack
          </button>
          <button className="glass-button-micro px-3 py-1.5 text-xs rounded-full text-white/60 hover:text-white">
            Email
          </button>
          <button className="glass-button-micro px-3 py-1.5 text-xs rounded-full text-white/60 hover:text-white">
            Discord
          </button>
          <Filter className="w-4 h-4 text-white/40 ml-auto" />
        </div>
        <div className="space-y-3">
          <div className="glass-card-inner rounded-xl p-4 border-l-4 border-l-red-400/60 hover:border-l-red-400 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-white mb-1">Q4 Budget Review - URGENT</p>
                <p className="text-xs text-white/60">
                  Sarah Johnson •{" "}
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs">Slack</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button className="glass-button-primary px-3 py-1.5 text-xs rounded-lg">Reply</button>
                <button className="glass-button-micro px-3 py-1.5 text-xs rounded-lg text-white/80">Snooze</button>
              </div>
            </div>
          </div>
          <div className="glass-card-inner rounded-xl p-4 border-l-4 border-l-amber-400/60 hover:border-l-amber-400 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-white mb-1">Client Strategy Session</p>
                <p className="text-xs text-white/60">
                  Mike Chen •{" "}
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full text-xs">Email</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button className="glass-button-primary px-3 py-1.5 text-xs rounded-lg">Reply</button>
                <button className="glass-button-micro px-3 py-1.5 text-xs rounded-lg text-white/80">Delegate</button>
              </div>
            </div>
          </div>
          <div className="glass-card-inner rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-white mb-1">Design Review Feedback</p>
                <p className="text-xs text-white/60">
                  Team •{" "}
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs">Discord</span>
                </p>
              </div>
              <button className="glass-button-primary px-3 py-1.5 text-xs rounded-lg">View</button>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "documents",
    title: "Documents & Follow-ups",
    priority: "medium",
    effort: "medium",
    category: "documents",
    x: 60,
    y: 60,
    icon: <FileText className="w-5 h-5 text-violet-400" />,
    content: (
      <div className="space-y-3">
        <div className="glass-card-inner rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-sm text-white">Technical Spec Draft</p>
                <p className="text-xs text-white/60">Needs your review</p>
              </div>
            </div>
            <button className="glass-button-primary px-3 py-1.5 text-xs rounded-lg">Review</button>
          </div>
        </div>
        <div className="glass-card-inner rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <div>
                <p className="font-semibold text-sm text-white">Q4 Roadmap</p>
                <p className="text-xs text-white/60">Waiting on Engineering</p>
              </div>
            </div>
            <button className="glass-button-micro px-3 py-1.5 text-xs rounded-lg text-white/80">Follow up</button>
          </div>
        </div>
        <div className="glass-card-inner rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div>
                <p className="font-semibold text-sm text-white">Investor Update</p>
                <p className="text-xs text-white/60">Approved & sent</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "calendar",
    title: "Calendar & Foresight",
    priority: "high",
    effort: "low",
    category: "calendar",
    x: 25,
    y: 75,
    icon: <Calendar className="w-5 h-5 text-cyan-400" />,
    content: (
      <div className="space-y-4">
        <div className="glass-card-inner rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm text-white">Today's Schedule</p>
            <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">4 meetings</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-white">Team Standup</span>
              <span className="text-white/60">9:00 AM</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-white">Design Review</span>
              <span className="text-white/60">2:00 PM</span>
            </div>
            <div className="flex justify-between items-center text-red-400 py-1 bg-red-500/10 px-2 rounded-lg">
              <span>Client Call (CONFLICT)</span>
              <span>2:30 PM</span>
            </div>
          </div>
        </div>
        <div className="glass-card-inner rounded-xl p-4 bg-cyan-500/10 border border-cyan-400/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-sm font-semibold text-white">AI Foresight</p>
          </div>
          <p className="text-xs text-white/80">
            Remind team about tomorrow's client presentation. Prep materials needed.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "team-activity",
    title: "Team Activity & Productivity",
    priority: "medium",
    effort: "low",
    category: "team",
    x: 70,
    y: 40,
    icon: <Users className="w-5 h-5 text-green-400" />,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {executiveMetrics.map((metric, index) => (
            <div key={index} className="glass-card-inner rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">{metric.icon}</div>
                <span className="text-xs text-white/60">{metric.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{metric.value}</span>
                <span className={`text-xs font-medium ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card-inner rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Focus vs Communications</span>
            <BarChart3 className="w-4 h-4 text-white/40" />
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: "68%" }}
            ></div>
          </div>
          <p className="text-xs text-white/60">68% focused work time today</p>
        </div>
      </div>
    ),
  },
  {
    id: "team-pulse",
    title: "Internal Team Pulse",
    priority: "low",
    effort: "low",
    category: "team",
    x: 75,
    y: 25,
    icon: <Activity className="w-5 h-5 text-green-400" />,
    content: (
      <div className="space-y-3">
        <div className="glass-card-inner rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Team Sentiment</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">Positive</span>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-white">Engineering</span>
              <span className="text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">High velocity</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Design</span>
              <span className="text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">Moderate load</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Marketing</span>
              <span className="text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">On track</span>
            </div>
          </div>
        </div>
        <div className="glass-card-inner rounded-xl p-4">
          <p className="text-sm font-semibold mb-2 text-white">Recent Blockers</p>
          <p className="text-xs text-white/70">API integration delay resolved. Design system updates in progress.</p>
        </div>
      </div>
    ),
  },
  {
    id: "tasks",
    title: "AI-Curated Tasks",
    priority: "high",
    effort: "medium",
    category: "tasks",
    x: 30,
    y: 85,
    icon: <ClipboardCheck className="w-5 h-5 text-orange-400" />,
    content: (
      <div className="space-y-3">
        <div className="glass-card-inner rounded-xl p-4 border-l-4 border-l-red-400/60 hover:border-l-red-400 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-white">Reply to investor email</p>
              <p className="text-xs text-red-400">Due 2 hours ago</p>
            </div>
            <button className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg border border-red-400/30 hover:bg-red-500/30 transition-all duration-200">
              Urgent
            </button>
          </div>
        </div>
        <div className="glass-card-inner rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-white">Prepare design review materials</p>
              <p className="text-xs text-white/60">Due tomorrow</p>
            </div>
            <button className="glass-button-primary px-3 py-1.5 text-xs rounded-lg">Start</button>
          </div>
        </div>
        <div className="glass-card-inner rounded-xl p-4 bg-blue-500/5 border border-blue-400/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <div>
                <p className="font-semibold text-sm text-white">Follow up on recruitment brief</p>
                <p className="text-xs text-blue-400">AI Suggested</p>
              </div>
            </div>
            <button className="glass-button-micro px-3 py-1.5 text-xs rounded-lg text-white/80">Add</button>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Quick add new task..."
            className="w-full px-4 py-3 text-sm glass-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-white/40"
          />
        </div>
      </div>
    ),
  },
]

const individualTasks: IndividualTask[] = [
  // Quick Wins (High Priority / Low Effort) - 5 tasks
  {
    id: "approve-budget-email",
    title: "Approve budget email",
    category: "comms",
    priority: "high",
    effort: "low",
    importance: 8,
    timeLeft: "30min",
    details: "Finance Team • Email",
    type: "email",
  },
  {
    id: "reply-client-message",
    title: "Reply to client message",
    category: "comms",
    priority: "high",
    effort: "low",
    importance: 7,
    timeLeft: "45min",
    details: "John Smith • Slack",
    type: "message",
  },
  {
    id: "confirm-design-change",
    title: "Confirm design change",
    category: "docs",
    priority: "high",
    effort: "low",
    importance: 6,
    timeLeft: "1h",
    details: "Design Team • Review",
    type: "review",
  },
  {
    id: "send-calendar-invite",
    title: "Send calendar invite",
    category: "calendar",
    priority: "high",
    effort: "low",
    importance: 5,
    timeLeft: "2h",
    details: "Team Meeting • Calendar",
    type: "meeting",
  },
  {
    id: "review-quick-doc",
    title: "Review quick doc update",
    category: "docs",
    priority: "high",
    effort: "low",
    importance: 6,
    timeLeft: "1.5h",
    details: "Product Spec • Document",
    type: "document",
  },

  // Big Bets (High Priority / High Effort) - 5 tasks
  {
    id: "finalize-investor-deck",
    title: "Finalize investor deck",
    category: "docs",
    priority: "high",
    effort: "high",
    importance: 10,
    timeLeft: "2 days",
    details: "Q4 Presentation • Document",
    type: "document",
  },
  {
    id: "product-launch-prep",
    title: "Product launch prep",
    category: "team",
    priority: "high",
    effort: "high",
    importance: 9,
    timeLeft: "1 week",
    details: "Launch Team • Project",
    type: "task",
  },
  {
    id: "coordinate-roadmap",
    title: "Coordinate cross-team roadmap",
    category: "team",
    priority: "high",
    effort: "high",
    importance: 8,
    timeLeft: "3 days",
    details: "Engineering & Product • Planning",
    type: "task",
  },
  {
    id: "draft-legal-compliance",
    title: "Draft legal compliance doc",
    category: "docs",
    priority: "high",
    effort: "high",
    importance: 9,
    timeLeft: "1 week",
    details: "Legal Team • Document",
    type: "document",
  },
  {
    id: "negotiate-supplier-contract",
    title: "Negotiate supplier contract",
    category: "sales",
    priority: "high",
    effort: "high",
    importance: 8,
    timeLeft: "5 days",
    details: "Procurement • Contract",
    type: "task",
  },

  // Trivial (Low Priority / Low Effort) - 5 tasks
  {
    id: "archive-slack-thread",
    title: "Archive old Slack thread",
    category: "comms",
    priority: "low",
    effort: "low",
    importance: 2,
    timeLeft: "Anytime",
    details: "General Channel • Cleanup",
    type: "message",
  },
  {
    id: "clean-inbox-clutter",
    title: "Clean inbox clutter",
    category: "comms",
    priority: "low",
    effort: "low",
    importance: 3,
    timeLeft: "Anytime",
    details: "Email • Cleanup",
    type: "email",
  },
  {
    id: "update-profile-picture",
    title: "Update profile picture",
    category: "team",
    priority: "low",
    effort: "low",
    importance: 2,
    timeLeft: "Anytime",
    details: "HR System • Profile",
    type: "task",
  },
  {
    id: "note-typo-fixes",
    title: "Note minor typo fixes",
    category: "docs",
    priority: "low",
    effort: "low",
    importance: 3,
    timeLeft: "Anytime",
    details: "Documentation • Review",
    type: "document",
  },
  {
    id: "check-optional-event",
    title: "Check optional event invite",
    category: "calendar",
    priority: "low",
    effort: "low",
    importance: 2,
    timeLeft: "Anytime",
    details: "Company Social • Optional",
    type: "meeting",
  },

  // Time Sinks (Low Priority / High Effort) - 5 tasks
  {
    id: "reformat-legacy-data",
    title: "Reformat legacy data sheets",
    category: "docs",
    priority: "low",
    effort: "high",
    importance: 4,
    timeLeft: "Next month",
    details: "Old Reports • Cleanup",
    type: "document",
  },
  {
    id: "troubleshoot-minor-bugs",
    title: "Troubleshoot minor bug backlog",
    category: "team",
    priority: "low",
    effort: "high",
    importance: 3,
    timeLeft: "Next sprint",
    details: "Engineering • Backlog",
    type: "task",
  },
  {
    id: "update-marketing-assets",
    title: "Update old marketing assets",
    category: "sales",
    priority: "low",
    effort: "high",
    importance: 4,
    timeLeft: "Next quarter",
    details: "Marketing • Assets",
    type: "task",
  },
  {
    id: "long-survey-analysis",
    title: "Long survey analysis",
    category: "sales",
    priority: "low",
    effort: "high",
    importance: 3,
    timeLeft: "Next month",
    details: "Customer Research • Analytics",
    type: "analytics",
  },
  {
    id: "unnecessary-process-doc",
    title: "Unnecessary process documentation",
    category: "docs",
    priority: "low",
    effort: "high",
    importance: 2,
    timeLeft: "Someday",
    details: "Process • Documentation",
    type: "document",
  },
]

const categoryColors = {
  comms: {
    bg: "rgba(59, 130, 246, 0.15)",
    border: "rgba(59, 130, 246, 0.4)",
    text: "rgb(147, 197, 253)",
    glow: "0 0 20px rgba(59, 130, 246, 0.3)",
    solid: "rgb(59, 130, 246)",
  },
  docs: {
    bg: "rgba(139, 92, 246, 0.15)",
    border: "rgba(139, 92, 246, 0.4)",
    text: "rgb(196, 181, 253)",
    glow: "0 0 20px rgba(139, 92, 246, 0.3)",
    solid: "rgb(139, 92, 246)",
  },
  calendar: {
    bg: "rgba(6, 182, 212, 0.15)",
    border: "rgba(6, 182, 212, 0.4)",
    text: "rgb(165, 243, 252)",
    glow: "0 0 20px rgba(6, 182, 212, 0.3)",
    solid: "rgb(6, 182, 212)",
  },
  team: {
    bg: "rgba(34, 197, 94, 0.15)",
    border: "rgba(34, 197, 94, 0.4)",
    text: "rgb(134, 239, 172)",
    glow: "0 0 20px rgba(34, 197, 94, 0.3)",
    solid: "rgb(34, 197, 94)",
  },
  sales: {
    bg: "rgba(249, 115, 22, 0.15)",
    border: "rgba(249, 115, 22, 0.4)",
    text: "rgb(254, 215, 170)",
    glow: "0 0 20px rgba(249, 115, 22, 0.3)",
    solid: "rgb(249, 115, 22)",
  },
}

const getConvexHull = (points: { x: number; y: number }[]) => {
  if (points.length < 3) return points

  // Sort points by x-coordinate
  points.sort((a, b) => a.x - b.x || a.y - b.y)

  // Build lower hull
  const lower = []
  for (let i = 0; i < points.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
      lower.pop()
    }
    lower.push(points[i])
  }

  // Build upper hull
  const upper = []
  for (let i = points.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
      upper.pop()
    }
    upper.push(points[i])
  }

  // Remove last point of each half because it's repeated
  upper.pop()
  lower.pop()

  return lower.concat(upper)
}

const cross = (o: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) => {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
}

const getTaskClusters = (tasks: IndividualTask[], taskPositions: any) => {
  const clusters: { [key: string]: (typeof individualTasks & { coords: { x: number; y: number } })[] } = {}
  const clusterRadius = 60

  tasks.forEach((task) => {
    // Use task position from state if it exists (for dragged tasks), otherwise calculate default
    const taskPosition = taskPositions[task.id]
    const coords = taskPosition || getQuadrantCoords(task.priority, task.effort, task.id, task.category)
    let clustered = false

    // Check if task should join existing cluster (same category only)
    Object.entries(clusters).forEach(([clusterKey, clusterTasks]) => {
      if (clustered) return

      const clusterCoords = clusterTasks[0].coords
      const distance = Math.sqrt(Math.pow(coords.x - clusterCoords.x, 2) + Math.pow(coords.y - clusterCoords.y, 2))

      if (distance < clusterRadius && task.category === clusterTasks[0].category) {
        clusters[clusterKey].push({ ...task, coords })
        clustered = true
      }
    })

    if (!clustered) {
      const clusterKey = `${task.category}-${Object.keys(clusters).length}`
      clusters[clusterKey] = [{ ...task, coords }]
    }
  })

  return clusters
}

const getQuadrantCoords = (priority: string, effort: string, taskId: string, category: string) => {
  // Use task ID and category to create deterministic positioning
  const hash = (taskId + category).split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  const variation = (Math.abs(hash) % 100) / 100 // 0-1 deterministic variation
  const categoryOffset = (Math.abs(hash * 3) % 100) / 100 // Additional category-based variation

  // Base positioning on priority/effort but allow cross-quadrant distribution
  let baseX, baseY

  if (priority === "high" && effort === "low") {
    // Quick Wins - but allow some spread
    baseX = 20 + variation * 25
    baseY = 20 + variation * 25
  } else if (priority === "high" && effort === "high") {
    // Big Bets
    baseX = 55 + variation * 25
    baseY = 20 + variation * 25
  } else if (priority === "low" && effort === "low") {
    // Trivial
    baseX = 20 + variation * 25
    baseY = 55 + variation * 25
  } else {
    // Time Sinks
    baseX = 55 + variation * 25
    baseY = 55 + variation * 25
  }

  // Add category-based distribution to allow cross-quadrant connections
  const x = Math.max(10, Math.min(90, baseX + (categoryOffset - 0.5) * 30))
  const y = Math.max(10, Math.min(90, baseY + ((Math.abs(hash * 2) % 100) / 100 - 0.5) * 30))

  return { x, y }
}

const getBubbleSize = (importance: number) => {
  // Uniform bubble sizes, modest and consistent (roughly 3% of quadrant width = ~12px)
  return 12 // All bubbles same size for clean, uniform appearance
}

const getQuadrantPosition = (priority: string, effort: string, index: number) => {
  // Define fixed quadrant centers and spread tasks around them
  const quadrants = {
    "high-low": { centerX: 25, centerY: 25, name: "Quick Wins" }, // Top-left
    "high-high": { centerX: 75, centerY: 25, name: "Big Bets" }, // Top-right
    "low-low": { centerX: 25, centerY: 75, name: "Trivial" }, // Bottom-left
    "low-high": { centerX: 75, centerY: 75, name: "Time Sinks" }, // Bottom-right
  }

  const quadrantKey = `${priority}-${effort}` as keyof typeof quadrants
  const quadrant = quadrants[quadrantKey]

  if (!quadrant) return { x: 50, y: 50 }

  // Spread tasks in a circle around quadrant center
  const angle = index * 2.5 + Math.random() * 0.5 // Slight randomization
  const radius = 8 + (index % 3) * 3 // Vary distance from center

  return {
    x: quadrant.centerX + Math.cos(angle) * radius,
    y: quadrant.centerY + Math.sin(angle) * radius,
  }
}

const distributeTasksAcrossQuadrants = () => {
  const distributedTasks = [
    // Quick Wins (High Priority, Low Effort) - Top Left
    { id: "qw1", title: "Reply to urgent emails", category: "comms", priority: "high", effort: "low", importance: 9 },
    {
      id: "qw2",
      title: "Approve budget request",
      category: "docs",
      priority: "high",
      effort: "low",
      importance: 8,
    },
    { id: "qw3", title: "Schedule team meeting", category: "calendar", priority: "high", effort: "low", importance: 7 },
    {
      id: "qw4",
      title: "Review contract terms",
      category: "docs",
      priority: "high",
      effort: "low",
      importance: 8,
    },
    { id: "qw5", title: "Call key client", category: "sales", priority: "high", effort: "low", importance: 9 },

    // Big Bets (High Priority, High Effort) - Top Right
    { id: "bb1", title: "Launch new product line", category: "team", priority: "high", effort: "high", importance: 10 },
    {
      id: "bb2",
      title: "Negotiate major partnership",
      category: "sales",
      priority: "high",
      effort: "high",
      importance: 9,
    },
    { id: "bb3", title: "Restructure department", category: "team", priority: "high", effort: "high", importance: 8 },
    {
      id: "bb4",
      title: "Develop strategic plan",
      category: "docs",
      priority: "high",
      effort: "high",
      importance: 9,
    },
    { id: "bb5", title: "Implement new CRM", category: "team", priority: "high", effort: "high", importance: 8 },

    // Trivial (Low Priority, Low Effort) - Bottom Left
    { id: "tr1", title: "Update LinkedIn profile", category: "comms", priority: "low", effort: "low", importance: 3 },
    { id: "tr2", title: "Organize desk files", category: "docs", priority: "low", effort: "low", importance: 2 },
    { id: "tr3", title: "Book lunch reservation", category: "calendar", priority: "low", effort: "low", importance: 3 },
    {
      id: "tr4",
      title: "Read industry newsletter",
      category: "docs",
      priority: "low",
      effort: "low",
      importance: 4,
    },
    { id: "tr5", title: "Update team photos", category: "team", priority: "low", effort: "low", importance: 2 },

    // Time Sinks (Low Priority, High Effort) - Bottom Right
    {
      id: "ts1",
      title: "Reorganize entire filing system",
      category: "docs",
      priority: "low",
      effort: "high",
      importance: 3,
    },
    {
      id: "ts2",
      title: "Research competitor analysis",
      category: "sales",
      priority: "low",
      effort: "high",
      importance: 4,
    },
    {
      id: "ts3",
      title: "Attend optional conference",
      category: "calendar",
      priority: "low",
      effort: "high",
      importance: 3,
    },
    {
      id: "ts4",
      title: "Perfect presentation slides",
      category: "docs",
      priority: "low",
      effort: "high",
      importance: 4,
    },
    { id: "ts5", title: "Learn new software tool", category: "team", priority: "low", effort: "high", importance: 5 },
  ]

  return distributedTasks.map((task, index) => ({
    ...task,
    position: getQuadrantPosition(task.priority, task.effort, index),
    details: `${task.category} task`,
    timeLeft: `${Math.floor(Math.random() * 5) + 1}h`,
  }))
}

const getTasksByCategory = (tasks: any[]) => {
  const categories: { [key: string]: any[] } = {}
  tasks.forEach((task) => {
    if (!categories[task.category]) {
      categories[task.category] = []
    }
    categories[task.category].push(task)
  })
  return categories
}

const BrowserAddressBar = () => (
  <div className="glass-panel rounded-xl p-2 mb-4 flex items-center gap-3">
    <div className="flex items-center gap-2">
      <button className="glass-button-micro p-1.5 rounded-lg">
        <ChevronLeft className="w-3 h-3 text-white/60" />
      </button>
      <button className="glass-button-micro p-1.5 rounded-lg">
        <ChevronRight className="w-3 h-3 text-white/60" />
      </button>
    </div>
    <div className="flex-1 glass-input rounded-lg px-3 py-1.5 text-xs text-white/80">
      https://tatkraft.executive/dashboard
    </div>
    <div className="flex gap-1">
      <div className="w-16 h-6 glass-button-micro rounded-md text-xs flex items-center justify-center text-white/60">
        Dashboard
      </div>
      <div className="w-12 h-6 glass-button-micro rounded-md text-xs flex items-center justify-center text-white/40">
        +
      </div>
    </div>
  </div>
)

const UniversalInboxContent = ({
  activeFilter,
  setActiveFilter,
}: { activeFilter: string; setActiveFilter: (filter: string) => void }) => {
  const allMessages = [
    {
      id: 1,
      title: "Q4 Budget Review - URGENT",
      sender: "Sarah Johnson",
      channel: "Slack",
      priority: "high",
      snippet: "Need your approval on the revised budget allocations...",
    },
    {
      id: 2,
      title: "Client Strategy Session",
      sender: "Mike Chen",
      channel: "Email",
      priority: "medium",
      snippet: "Following up on our discussion about the new client onboarding...",
    },
    {
      id: 3,
      title: "Design Review Feedback",
      sender: "Team",
      channel: "Discord",
      priority: "low",
      snippet: "Latest mockups are ready for your review...",
    },
    {
      id: 4,
      title: "Board Meeting Prep",
      sender: "Executive Assistant",
      channel: "Email",
      priority: "high",
      snippet: "Agenda and materials attached for tomorrow's meeting...",
    },
    {
      id: 5,
      title: "Engineering Standup",
      sender: "Dev Team",
      channel: "Slack",
      priority: "medium",
      snippet: "Sprint review and planning for next iteration...",
    },
    {
      id: 6,
      title: "Marketing Campaign Results",
      sender: "Marketing",
      channel: "Email",
      priority: "medium",
      snippet: "Q3 campaign performance metrics and insights...",
    },
    {
      id: 7,
      title: "HR Policy Update",
      sender: "HR Team",
      channel: "Slack",
      priority: "low",
      snippet: "New remote work guidelines effective next month...",
    },
    {
      id: 8,
      title: "Vendor Contract Review",
      sender: "Legal",
      channel: "Email",
      priority: "high",
      snippet: "Contract amendments require your signature...",
    },
    {
      id: 9,
      title: "Product Launch Timeline",
      sender: "Product Team",
      channel: "Discord",
      priority: "high",
      snippet: "Updated timeline for the Q1 product launch...",
    },
    {
      id: 10,
      title: "Customer Feedback Summary",
      sender: "Support",
      channel: "Email",
      priority: "medium",
      snippet: "Weekly summary of customer feedback and issues...",
    },
    {
      id: 11,
      title: "Security Audit Results",
      sender: "IT Security",
      channel: "Slack",
      priority: "high",
      snippet: "Quarterly security audit findings and recommendations...",
    },
    {
      id: 12,
      title: "Partnership Proposal",
      sender: "Business Dev",
      channel: "Email",
      priority: "medium",
      snippet: "New partnership opportunity with strategic implications...",
    },
    {
      id: 13,
      title: "Team Building Event",
      sender: "Operations",
      channel: "Discord",
      priority: "low",
      snippet: "Planning the annual team retreat and activities...",
    },
    {
      id: 14,
      title: "Financial Report Q3",
      sender: "Finance",
      channel: "Email",
      priority: "high",
      snippet: "Quarterly financial results and variance analysis...",
    },
    {
      id: 15,
      title: "Competitor Analysis",
      sender: "Strategy",
      channel: "Slack",
      priority: "medium",
      snippet: "Latest competitive landscape analysis and insights...",
    },
    {
      id: 16,
      title: "Office Lease Renewal",
      sender: "Facilities",
      channel: "Email",
      priority: "medium",
      snippet: "Lease renewal terms and negotiation points...",
    },
    {
      id: 17,
      title: "Training Program Launch",
      sender: "L&D",
      channel: "Discord",
      priority: "low",
      snippet: "New employee development program rollout...",
    },
    {
      id: 18,
      title: "Investor Relations Update",
      sender: "IR Team",
      channel: "Email",
      priority: "high",
      snippet: "Monthly investor communication and updates...",
    },
    {
      id: 19,
      title: "Supply Chain Issues",
      sender: "Operations",
      channel: "Slack",
      priority: "high",
      snippet: "Current supply chain disruptions and mitigation...",
    },
    {
      id: 20,
      title: "Brand Guidelines Update",
      sender: "Creative",
      channel: "Discord",
      priority: "low",
      snippet: "Updated brand guidelines and asset library...",
    },
  ]

  const filteredMessages =
    activeFilter === "All" ? allMessages : allMessages.filter((msg) => msg.channel === activeFilter)

  return (
    <div className="h-full flex flex-col">
      {/* Filter buttons */}
      <div className="flex gap-1 mb-3 flex-shrink-0">
        {["All", "Slack", "Discord", "Email"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-2 py-1 rounded-md text-xs transition-all ${
              activeFilter === filter
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                : "text-white/60 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`glass-card-inner rounded-lg p-3 cursor-pointer hover:bg-white/5 transition-all ${
                message.priority === "urgent"
                  ? "border-l-2 border-red-400"
                  : message.priority === "high"
                    ? "border-l-2 border-amber-400"
                    : ""
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium text-white truncate flex-1">{message.title}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ml-2 flex-shrink-0 ${
                    message.channel === "Slack"
                      ? "bg-purple-500/20 text-purple-400"
                      : message.channel === "Discord"
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {message.channel}
                </span>
              </div>
              <p className="text-xs text-white/60 mb-1">{message.sender}</p>
              <p className="text-xs text-white/80 line-clamp-2">{message.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const DocumentsContent = () => (
  <div className="space-y-2 max-h-64 overflow-y-auto">
    {[
      { title: "Technical Spec Draft", status: "Needs review", priority: "high", action: "Review" },
      { title: "Q4 Roadmap", status: "Waiting on Engineering", priority: "medium", action: "Follow up" },
      { title: "Investor Update", status: "Approved & sent", priority: "low", action: "Complete" },
      { title: "Marketing Brief", status: "In progress", priority: "medium", action: "Check" },
      { title: "Legal Contract", status: "Pending signature", priority: "high", action: "Sign" },
      { title: "Budget Proposal", status: "Under review", priority: "medium", action: "Review" },
      { title: "Team Handbook", status: "Draft complete", priority: "low", action: "Approve" },
      { title: "Security Policy", status: "Needs update", priority: "high", action: "Update" },
    ].map((doc, index) => (
      <div key={index} className="glass-card-inner rounded-lg p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                doc.priority === "high"
                  ? "bg-red-400 animate-pulse"
                  : doc.priority === "medium"
                    ? "bg-amber-400"
                    : "bg-green-400"
              }`}
            ></div>
            <div>
              <p className="font-medium text-xs text-white">{doc.title}</p>
              <p className="text-xs text-white/60">{doc.status}</p>
            </div>
          </div>
          <button className="glass-button-primary px-2 py-1 text-xs rounded">{doc.action}</button>
        </div>
      </div>
    ))}
  </div>
)

const CalendarContent = () => (
  <div className="space-y-3">
    <div className="glass-card-inner rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-xs text-white">Today's Schedule</p>
        <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded-full">8 events</span>
      </div>
      <div className="space-y-1 text-xs max-h-40 overflow-y-auto">
        {[
          { event: "Team Standup", time: "9:00 AM", type: "normal" },
          { event: "1:1 with Sarah", time: "10:30 AM", type: "normal" },
          { event: "Budget Review", time: "11:00 AM", type: "important" },
          { event: "Lunch with Investors", time: "12:30 PM", type: "normal" },
          { event: "Design Review", time: "2:00 PM", type: "normal" },
          { event: "Client Call (CONFLICT)", time: "2:30 PM", type: "conflict" },
          { event: "Strategy Session", time: "4:00 PM", type: "important" },
          { event: "Team All-Hands", time: "5:00 PM", type: "normal" },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-1 px-2 rounded ${
              item.type === "conflict"
                ? "text-red-400 bg-red-500/10"
                : item.type === "important"
                  ? "text-amber-400 bg-amber-500/10"
                  : "text-white"
            }`}
          >
            <span>{item.event}</span>
            <span className="text-white/60">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="glass-card-inner rounded-lg p-3 bg-cyan-500/10 border border-cyan-400/20">
      <div className="flex items-center gap-2 mb-1">
        <Brain className="w-3 h-3 text-cyan-400" />
        <p className="text-xs font-medium text-white">AI Foresight</p>
      </div>
      <p className="text-xs text-white/80">Remind team about tomorrow's client presentation. Prep materials needed.</p>
    </div>
  </div>
)

const AITasksContent = () => (
  <div className="space-y-2">
    {[
      {
        task: "Reply to investor email",
        status: "Due 2 hours ago",
        priority: "urgent",
        label: "Overdue",
        effort: 3,
        impact: 9,
      },
      {
        task: "Prepare design review materials",
        status: "Due tomorrow",
        priority: "high",
        label: "Due today",
        effort: 7,
        impact: 8,
      },
      {
        task: "Follow up on recruitment brief",
        status: "AI Suggested",
        priority: "medium",
        label: "AI Suggested",
        effort: 4,
        impact: 6,
      },
      {
        task: "Review Q4 budget allocations",
        status: "Waiting for review",
        priority: "high",
        label: "Waiting for review",
        effort: 8,
        impact: 9,
      },
      {
        task: "Update team on project status",
        status: "Forgotten task",
        priority: "medium",
        label: "Forgotten tasks",
        effort: 2,
        impact: 5,
      },
      {
        task: "Schedule client check-in",
        status: "Due this week",
        priority: "medium",
        label: "Due today",
        effort: 3,
        impact: 7,
      },
      {
        task: "Approve marketing campaign",
        status: "Pending approval",
        priority: "high",
        label: "Waiting for review",
        effort: 5,
        impact: 8,
      },
      {
        task: "Review security audit",
        status: "Due next week",
        priority: "low",
        label: "Due today",
        effort: 6,
        impact: 4,
      },
    ].map((task, index) => (
      <div
        key={index}
        className={`glass-card-inner rounded-lg p-2 border-l-2 ${
          task.priority === "urgent"
            ? "border-l-red-400/60 bg-red-500/5"
            : task.priority === "high"
              ? "border-l-amber-400/60"
              : "border-l-blue-400/60 bg-blue-500/5"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="font-medium text-xs text-white">{task.task}</p>
            <div className="flex items-center gap-2 mt-1">
              <p
                className={`text-xs ${
                  task.priority === "urgent"
                    ? "text-red-400"
                    : task.priority === "high"
                      ? "text-amber-400"
                      : "text-blue-400"
                }`}
              >
                {task.status}
              </p>
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs ${
                  task.label === "Overdue"
                    ? "bg-red-500/20 text-red-300"
                    : task.label === "AI Suggested"
                      ? "bg-blue-500/20 text-blue-300"
                      : task.label === "Waiting for review"
                        ? "bg-amber-500/20 text-amber-300"
                        : task.label === "Forgotten tasks"
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-green-500/20 text-green-300"
                }`}
              >
                {task.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <span className="px-1.5 py-0.5 rounded text-xs bg-orange-500/20 text-orange-300 font-mono">
              E{task.effort}
            </span>
            <span className="px-1.5 py-0.5 rounded text-xs bg-cyan-500/20 text-cyan-300 font-mono">I{task.impact}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
)

const teamPerformanceData = [
  { subject: "Team", A: 85, fullMark: 100 },
  { subject: "Performance", A: 92, fullMark: 100 },
  { subject: "Operations", A: 78, fullMark: 100 },
  { subject: "Communications", A: 88, fullMark: 100 },
  { subject: "Public Relations", A: 75, fullMark: 100 },
]

const TeamActivityContent = () => (
  <div className="grid grid-cols-12 gap-4">
    {/* Key Metrics - Top Row */}
    <div className="col-span-12 grid grid-cols-6 gap-3">
      <div className="glass-card-inner rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-green-400">24</div>
        <div className="text-xs text-white/60">Active Users</div>
        <div className="text-xs text-green-400 mt-1">+3 today</div>
      </div>
      <div className="glass-card-inner rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-amber-400">3</div>
        <div className="text-xs text-white/60">Out of Office</div>
        <div className="text-xs text-amber-400 mt-1">2 planned</div>
      </div>
      <div className="glass-card-inner rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-blue-400">2.3h</div>
        <div className="text-xs text-white/60">Avg Response</div>
        <div className="text-xs text-blue-400 mt-1">-15min</div>
      </div>
      <div className="glass-card-inner rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-purple-400">87%</div>
        <div className="text-xs text-white/60">Team Sentiment</div>
        <div className="text-xs text-purple-400 mt-1">+5% week</div>
      </div>
      <div className="glass-card-inner rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-cyan-400">156</div>
        <div className="text-xs text-white/60">Tasks Done</div>
        <div className="text-xs text-cyan-400 mt-1">+12 today</div>
      </div>
      <div className="glass-card-inner rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-orange-400">94%</div>
        <div className="text-xs text-white/60">On Time</div>
        <div className="text-xs text-orange-400 mt-1">+2% week</div>
      </div>
    </div>

    {/* Radar Chart - Team Performance */}
    <div className="col-span-4 glass-card-inner rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white">Team Performance Radar</span>
        <Activity className="w-4 h-4 text-white/40" />
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={teamPerformanceData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 8 }} />
            <Radar name="Performance" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Activity Trends */}
    <div className="col-span-4 glass-card-inner rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white">Weekly Activity Trends</span>
        <TrendingUp className="w-4 h-4 text-blue-400" />
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={[
              { day: "Mon", messages: 45, tasks: 12 },
              { day: "Tue", messages: 52, tasks: 15 },
              { day: "Wed", messages: 38, tasks: 8 },
              { day: "Thu", messages: 61, tasks: 18 },
              { day: "Fri", messages: 55, tasks: 14 },
              { day: "Sat", messages: 23, tasks: 5 },
              { day: "Sun", messages: 18, tasks: 3 },
            ]}
          >
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 8 }} />
            <Line type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 3 }} />
            <Line type="monotone" dataKey="tasks" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="col-span-4 glass-card-inner rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white">Top Performers</span>
        <Trophy className="w-4 h-4 text-amber-400" />
      </div>
      <div className="space-y-3">
        {[
          { name: "Sarah Johnson", role: "Product Lead", score: 98, avatar: "/professional-woman-headshot.png" },
          { name: "Mike Chen", role: "Engineering", score: 95, avatar: "/professional-man-headshot.png" },
          { name: "Lisa Park", role: "Design", score: 92, avatar: "/professional-woman-designer-headshot.png" },
          { name: "Alex Rivera", role: "Marketing", score: 89, avatar: "/professional-headshot.png" },
        ].map((person, index) => (
          <div key={index} className="flex items-center gap-3">
            <img
              src={person.avatar || "/placeholder.svg"}
              alt={person.name}
              className="w-8 h-8 rounded-full object-cover border border-white/20"
            />
            <div className="flex-1">
              <div className="text-xs font-medium text-white">{person.name}</div>
              <div className="text-xs text-white/60">{person.role}</div>
            </div>
            <div className="text-xs font-bold text-green-400">{person.score}%</div>
          </div>
        ))}
      </div>
    </div>

    {/* Department Workload */}
    <div className="col-span-6 glass-card-inner rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white">Department Workload Distribution</span>
        <BarChart3 className="w-4 h-4 text-white/40" />
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { dept: "Eng", workload: 85, capacity: 100 },
              { dept: "Design", workload: 72, capacity: 100 },
              { dept: "Marketing", workload: 68, capacity: 100 },
              { dept: "Sales", workload: 91, capacity: 100 },
              { dept: "Ops", workload: 76, capacity: 100 },
            ]}
          >
            <XAxis dataKey="dept" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 8 }} />
            <Bar dataKey="workload" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="capacity" fill="rgba(255,255,255,0.1)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Recent Activity Feed */}
    <div className="col-span-6 glass-card-inner rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white">Recent Activity</span>
        <Clock className="w-4 h-4 text-white/40" />
      </div>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {[
          { user: "Sarah J.", action: "completed task", item: "API integration", time: "2m ago", color: "green" },
          { user: "Mike C.", action: "updated design", item: "Landing page", time: "5m ago", color: "blue" },
          { user: "Alex R.", action: "sent proposal", item: "Q4 Campaign", time: "12m ago", color: "purple" },
          { user: "Emma L.", action: "resolved issue", item: "Server deployment", time: "18m ago", color: "orange" },
          { user: "Tom K.", action: "reviewed code", item: "Payment system", time: "25m ago", color: "cyan" },
        ].map((activity, i) => (
          <div key={i} className="flex items-center gap-3 text-xs">
            <div
              className={`w-2 h-2 rounded-full ${
                activity.color === "green"
                  ? "bg-green-400"
                  : activity.color === "blue"
                    ? "bg-blue-400"
                    : activity.color === "yellow"
                      ? "bg-yellow-400"
                      : activity.color === "red"
                        ? "bg-red-400"
                        : "bg-gray-400"
              }`}
            ></div>
            <div className="flex-1">
              <span className="text-white font-medium">{activity.user}</span>
              <span className="text-white/60"> {activity.action} </span>
              <span className="text-white">{activity.item}</span>
            </div>
            <span className="text-white/40">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default function DesktopMonitor() {
  const [currentMode, setCurrentMode] = useState<"dashboard" | "map" | "activity">("dashboard")
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [inboxFilter, setInboxFilter] = useState("All")
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [taskPositions, setTaskPositions] = useState<{
    [key: string]: { x: number; y: number; priority: string; effort: string }
  }>({})

  const updateTaskPosition = (taskId: string, x: number, y: number) => {
    const svgWidth = 1200
    const svgHeight = 600
    const percentX = (x / svgWidth) * 100
    const percentY = (y / svgHeight) * 100

    // Determine new priority and effort based on position
    const priority = percentY < 50 ? "high" : "low"
    const effort = percentX < 50 ? "low" : "high"

    setTaskPositions((prev) => ({
      ...prev,
      [taskId]: { x: percentX, y: percentY, priority, effort },
    }))
  }

  const getTaskPosition = (task: any) => {
    if (taskPositions[task.id]) {
      return taskPositions[task.id]
    }
    const coords = getQuadrantCoords(task.priority, task.effort, task.id, task.category)
    return { x: coords.x, y: coords.y, priority: task.priority, effort: task.effort }
  }

  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-fixed relative overflow-hidden"
      style={{ backgroundImage: "url(/apple-macos-mojave-stock-dark-midnight-13-10-2024-1728807253-hd-wallpaper.jpg)" }}
    >
      <div className="glass-panel border-b border-white/10 px-4 py-2 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 glass-card-inner rounded-lg px-3 py-1 text-sm text-white/80">
          localhost:3000/tatkraft
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="glass-panel rounded-2xl p-1 flex items-center gap-1">
            <button
              onClick={() => setCurrentMode("dashboard")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                currentMode === "dashboard" ? "bg-white/20 text-white shadow-lg" : "text-white/60 hover:text-white/80"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mr-2 inline" />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentMode("map")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                currentMode === "map"
                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white shadow-lg"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <Map className="w-4 h-4 mr-2 inline" />
              Map
            </button>
            <button
              onClick={() => setCurrentMode("activity")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                currentMode === "activity"
                  ? "bg-green-500/30 text-white shadow-lg"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <Activity className="w-4 h-4 mr-2 inline" />
              Activity
            </button>
          </div>

          <div className="glass-panel rounded-2xl px-4 py-2">
            <div className="text-right">
              <div className="text-sm font-medium text-white/90">Monday, July 15</div>
              <div className="text-xs text-white/60">Executive Dashboard</div>
            </div>
          </div>
        </div>

        {currentMode === "activity" && (
          <div className="space-y-6">
            <TeamActivityContent />
          </div>
        )}

        {currentMode === "dashboard" && (
          <div className="space-y-6">
            {/* Main Content Grid - More varied layout */}
            <div className="grid grid-cols-12 gap-4">
              {/* Left Column - Universal Inbox (spans 4 columns) */}
              <div className="col-span-4 glass-panel rounded-xl p-4 h-[600px] flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-medium text-white/90">Universal Inbox</h3>
                  </div>
                  <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-400/20">
                    23 new
                  </span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <UniversalInboxContent activeFilter={inboxFilter} setActiveFilter={setInboxFilter} />
                </div>
              </div>

              {/* Center Column - Documents & AI Tasks (spans 5 columns) */}
              <div className="col-span-5 space-y-4">
                {/* Documents */}
                <div className="glass-panel rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-400" />
                      <h3 className="text-sm font-medium text-white/90">Documents & Follow-ups</h3>
                    </div>
                    <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-1 rounded-full border border-violet-400/20">
                      8 items
                    </span>
                  </div>
                  <DocumentsContent />
                </div>

                {/* AI-Curated Tasks */}
                <div className="glass-panel rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-orange-400" />
                      <h3 className="text-sm font-medium text-white/90">AI-Curated Tasks</h3>
                    </div>
                    <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full border border-orange-400/20">
                      12 tasks
                    </span>
                  </div>
                  <AITasksContent />
                </div>
              </div>

              {/* Right Column - Calendar & Team Activity (spans 3 columns) */}
              <div className="col-span-3 space-y-4">
                {/* Calendar */}
                <div className="glass-panel rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-medium text-white/90">Calendar & Foresight</h3>
                    </div>
                    <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-400/20">
                      Today
                    </span>
                  </div>
                  <CalendarContent />
                </div>

                {/* Team Activity */}
                <div className="glass-panel rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-400" />
                      <h3 className="text-sm font-medium text-white/90">Team Activity</h3>
                    </div>
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-400/20">
                      Online
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Active Now</span>
                      <span className="text-sm font-bold text-green-400">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Tasks Completed</span>
                      <span className="text-sm font-bold text-blue-400">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Avg Response</span>
                      <span className="text-sm font-bold text-amber-400">2.3h</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                    <span className="text-xs text-white/60">Team Productivity: 87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentMode === "map" && (
          <div className="relative w-full h-[600px]">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="glass-panel rounded-2xl p-1 flex items-center gap-1">
                <button
                  onClick={() => setCategoryFilter("all")}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    categoryFilter === "all" ? "bg-white/20 text-white shadow-lg" : "text-white/60 hover:text-white/80"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setCategoryFilter("comms")}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    categoryFilter === "comms"
                      ? "bg-blue-500/30 text-blue-300 shadow-lg"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 inline-block mr-1"></div>
                  Comms
                </button>
                <button
                  onClick={() => setCategoryFilter("docs")}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    categoryFilter === "docs"
                      ? "bg-violet-500/30 text-violet-300 shadow-lg"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-violet-400 inline-block mr-1"></div>
                  Docs
                </button>
                <button
                  onClick={() => setCategoryFilter("calendar")}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    categoryFilter === "calendar"
                      ? "bg-cyan-500/30 text-cyan-300 shadow-lg"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 inline-block mr-1"></div>
                  Calendar
                </button>
                <button
                  onClick={() => setCategoryFilter("team")}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    categoryFilter === "team"
                      ? "bg-green-500/30 text-green-300 shadow-lg"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 inline-block mr-1"></div>
                  Team
                </button>
                <button
                  onClick={() => setCategoryFilter("sales")}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    categoryFilter === "sales"
                      ? "bg-orange-500/30 text-orange-300 shadow-lg"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-orange-400 inline-block mr-1"></div>
                  Sales
                </button>
              </div>
            </div>

            {/* Quick Wins Glow Effect */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl"></div>

            {/* Quadrant Labels */}
            <div className="absolute top-16 left-4 glass-card-inner rounded-lg px-3 py-1 text-xs text-white/60">
              High Priority / Low Effort
              <br />
              <span className="text-cyan-400 font-medium">Quick Wins</span>
            </div>
            <div className="absolute top-16 right-4 glass-card-inner rounded-lg px-3 py-1 text-xs text-white/60">
              High Priority / High Effort
              <br />
              <span className="text-violet-400 font-medium">Big Bets</span>
            </div>
            <div className="absolute bottom-4 left-4 glass-card-inner rounded-lg px-3 py-1 text-xs text-white/60">
              Low Priority / Low Effort
              <br />
              <span className="text-gray-400 font-medium">Trivial</span>
            </div>
            <div className="absolute bottom-4 right-4 glass-card-inner rounded-lg px-3 py-1 text-xs text-white/60">
              Low Priority / High Effort
              <br />
              <span className="text-orange-400 font-medium">Time Sinks</span>
            </div>

            <svg width="100%" height="600" className="absolute top-0 left-0">
              <defs>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="quickWinsGlow">
                  <feGaussianBlur stdDeviation="8" result="glowBlur" />
                  <feMerge>
                    <feMergeNode in="glowBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Crosshair */}
              <line x1="50%" y1="0" x2="50%" y2="600" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="0" y1="300" x2="100%" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

              {/* Quick Wins Halo Effect */}
              <rect
                x="0"
                y="0"
                width="50%"
                height="300"
                fill="rgba(255,255,255,0.02)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                rx="20"
                filter="url(#quickWinsGlow)"
                className="animate-pulse"
                style={{ animationDuration: "4s" }}
              />

              {Object.entries(
                getTaskClusters(
                  categoryFilter === "all"
                    ? individualTasks
                    : individualTasks.filter((task) => task.category === categoryFilter),
                  taskPositions,
                ),
              ).map(([clusterKey, clusterTasks]) => {
                if (clusterTasks.length < 1) return null

                const categoryColor = categoryColors[clusterTasks[0].category] || categoryColors.comms
                const svgWidth = 1200
                const svgHeight = 600

                // Convert coordinates to SVG space
                const points = clusterTasks.map((task) => ({
                  x: (task.coords.x / 100) * svgWidth,
                  y: (task.coords.y / 100) * svgHeight,
                }))

                if (clusterTasks.length === 1) {
                  // Single task - translucent circle
                  const point = points[0]
                  const radius = 35
                  return (
                    <circle
                      key={`cluster-${clusterKey}`}
                      cx={point.x}
                      cy={point.y}
                      r={radius}
                      fill={categoryColor.bg}
                      stroke={categoryColor.border}
                      strokeWidth="2"
                      className="transition-all duration-500"
                      style={{
                        filter: `drop-shadow(${categoryColor.glow})`,
                      }}
                    />
                  )
                }

                // Multiple tasks - smooth organic convex hull
                const padding = 15
                const expandedPoints = []
                points.forEach((point) => {
                  // Create minimal circular expansion around each point with fewer angles
                  for (let angle = 0; angle < 360; angle += 90) {
                    const rad = (angle * Math.PI) / 180
                    expandedPoints.push({
                      x: point.x + Math.cos(rad) * padding,
                      y: point.y + Math.sin(rad) * padding,
                    })
                  }
                })

                const hull = getConvexHull(expandedPoints)
                if (hull.length === 0) return null

                let pathData = `M ${hull[0].x},${hull[0].y}`
                for (let i = 1; i < hull.length; i++) {
                  const current = hull[i]
                  pathData += ` L ${current.x},${current.y}`
                }
                pathData += ` Z`

                return (
                  <path
                    key={`cluster-${clusterKey}`}
                    d={pathData}
                    fill={categoryColor.bg}
                    stroke={categoryColor.border}
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                    style={{
                      filter: `drop-shadow(${categoryColor.glow})`,
                    }}
                  />
                )
              })}

              {(categoryFilter === "all"
                ? individualTasks
                : individualTasks.filter((task) => task.category === categoryFilter)
              ).map((task) => {
                const taskPosition = taskPositions[task.id]
                const coords = taskPosition || getQuadrantCoords(task.priority, task.effort, task.id, task.category)
                const categoryColor = categoryColors[task.category] || categoryColors.comms

                const svgWidth = 1200
                const svgHeight = 600
                const svgX = (coords.x / 100) * svgWidth
                const svgY = (coords.y / 100) * svgHeight

                return (
                  <g key={task.id}>
                    <circle
                      cx={svgX}
                      cy={svgY}
                      r={getBubbleSize(task.importance)}
                      fill={categoryColor.bg}
                      stroke={categoryColor.border}
                      strokeWidth="1"
                      className="cursor-move transition-all duration-300 hover:r-14"
                      style={{
                        filter: `drop-shadow(${categoryColor.glow})`,
                      }}
                      onMouseDown={(e) => {
                        const startX = e.clientX
                        const startY = e.clientY
                        const startCoords = { ...coords }

                        const handleMouseMove = (moveEvent: MouseEvent) => {
                          const deltaX = ((moveEvent.clientX - startX) / svgWidth) * 100
                          const deltaY = ((moveEvent.clientY - startY) / svgHeight) * 100
                          const newCoords = {
                            x: Math.max(5, Math.min(95, startCoords.x + deltaX)),
                            y: Math.max(5, Math.min(95, startCoords.y + deltaY)),
                          }

                          setTaskPositions((prev) => ({
                            ...prev,
                            [task.id]: newCoords,
                          }))

                          // Update task priority/effort based on new position
                          const newPriority = newCoords.y < 50 ? "high" : "low"
                          const newEffort = newCoords.x < 50 ? "low" : "high"

                          // Update the task data
                          const taskIndex = individualTasks.findIndex((t) => t.id === task.id)
                          if (taskIndex !== -1) {
                            individualTasks[taskIndex] = {
                              ...individualTasks[taskIndex],
                              priority: newPriority,
                              effort: newEffort,
                            }
                          }
                        }

                        const handleMouseUp = () => {
                          document.removeEventListener("mousemove", handleMouseMove)
                          document.removeEventListener("mouseup", handleMouseUp)
                        }

                        document.addEventListener("mousemove", handleMouseMove)
                        document.addEventListener("mouseup", handleMouseUp)
                      }}
                    />
                    <text
                      x={svgX}
                      y={svgY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs font-medium fill-white pointer-events-none select-none"
                      style={{
                        fontSize: "10px",
                        textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                        filter: hoveredTask === task.id ? "brightness(1.5)" : "brightness(1)",
                      }}
                    >
                      {task.title.length > 12 ? task.title.substring(0, 12) + "..." : task.title}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
