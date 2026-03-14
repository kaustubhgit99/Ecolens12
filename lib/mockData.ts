export type Role = "citizen" | "authority" | "admin";
export type Priority = "high" | "medium" | "low";
export type Status =
  | "pending"
  | "under_review"
  | "assigned"
  | "in_progress"
  | "resolved"
  | "rejected";

export interface Complaint {
  id: string;
  title: string;
  cat: string;
  priority: Priority;
  status: Status;
  date: string;
  dept: string;
  thumb: string;
  location: string;
  desc: string;
  coins: number;
  ai: { cat: string; conf: number; sev: string };
  updates: { by: string; status: string; comment: string; date: string }[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  reports: number;
  resolved: number;
  coins: number;
  avatar: string;
  color: string;
  isMe?: boolean;
}

export interface CoinTransaction {
  date: string;
  event: string;
  amount: number;
  balance: number;
  type: string;
}

export interface StaffMember {
  name: string;
  assigned: number;
  resolved: number;
  avg: string;
  sla: string;
}

export interface Department {
  name: string;
  code: string;
  assigned: number;
  resolved: number;
  sla: string;
  avg: string;
  staff: number;
  escalated: number;
}

export const mockComplaints: Complaint[] = [
  {
    id: "ECO-2025-00042",
    title: "Large pothole on MG Road near Cafe Coffee Day",
    cat: "Road Damage",
    priority: "high",
    status: "in_progress",
    date: "2025-01-08",
    dept: "Public Works",
    thumb: "🚗",
    location: "MG Road, Pune",
    desc: "Dangerous pothole approximately 2ft wide causing vehicle damage. Several incidents reported.",
    coins: 10,
    ai: { cat: "Road Damage", conf: 94, sev: "High" },
    updates: [
      {
        by: "Authority",
        status: "in_progress",
        comment: "Team dispatched, repair scheduled for Jan 12",
        date: "Jan 10",
      },
    ],
  },
  {
    id: "ECO-2025-00038",
    title: "Garbage dump near Baner bus stop overflowing",
    cat: "Garbage",
    priority: "medium",
    status: "resolved",
    date: "2025-01-05",
    dept: "Sanitation",
    thumb: "🗑️",
    location: "Baner, Pune",
    desc: "Public garbage bin overflowing for 3 days, attracting stray animals.",
    coins: 30,
    ai: { cat: "Garbage", conf: 98, sev: "Medium" },
    updates: [
      {
        by: "Authority",
        status: "resolved",
        comment: "Area cleaned and additional bins placed",
        date: "Jan 7",
      },
    ],
  },
  {
    id: "ECO-2025-00031",
    title: "Street light malfunction on FC Road",
    cat: "Lighting",
    priority: "low",
    status: "pending",
    date: "2024-12-28",
    dept: "Electrical",
    thumb: "💡",
    location: "FC Road, Pune",
    desc: "3 consecutive street lights not working creating safety hazard at night.",
    coins: 10,
    ai: { cat: "Lighting", conf: 91, sev: "Low" },
    updates: [],
  },
  {
    id: "ECO-2025-00029",
    title: "Water leakage from main pipeline Hadapsar",
    cat: "Water",
    priority: "high",
    status: "under_review",
    date: "2024-12-25",
    dept: "Water Supply",
    thumb: "💧",
    location: "Hadapsar, Pune",
    desc: "Massive water leakage wasting thousands of litres per hour.",
    coins: 10,
    ai: { cat: "Water", conf: 96, sev: "High" },
    updates: [],
  },
  {
    id: "ECO-2025-00021",
    title: "Industrial noise pollution from factory",
    cat: "Noise",
    priority: "medium",
    status: "resolved",
    date: "2024-12-15",
    dept: "Environment",
    thumb: "🔊",
    location: "Bhosari, Pune",
    desc: "Factory operating beyond permissible noise levels after 10pm.",
    coins: 30,
    ai: { cat: "Noise", conf: 87, sev: "Medium" },
    updates: [],
  },
  {
    id: "ECO-2025-00015",
    title: "Sewage overflow near Kothrud market",
    cat: "Sewage",
    priority: "high",
    status: "rejected",
    date: "2024-12-10",
    dept: "Sanitation",
    thumb: "🚰",
    location: "Kothrud, Pune",
    desc: "Sewage overflowing onto main road causing health hazard.",
    coins: 10,
    ai: { cat: "Sewage", conf: 95, sev: "High" },
    updates: [
      {
        by: "Authority",
        status: "rejected",
        comment: "Issue found to be under MSEDCL jurisdiction, redirected.",
        date: "Dec 12",
      },
    ],
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Amit Desai", reports: 47, resolved: 38, coins: 1240, avatar: "AD", color: "#8B5CF6" },
  { rank: 2, name: "Sneha Patil", reports: 41, resolved: 33, coins: 1080, avatar: "SP", color: "#3B82F6" },
  { rank: 3, name: "Raj Kulkarni", reports: 38, resolved: 29, coins: 940, avatar: "RK", color: "#F59E0B" },
  { rank: 4, name: "Meera Joshi", reports: 35, resolved: 28, coins: 870, avatar: "MJ", color: "#22C55E" },
  { rank: 5, name: "Vikram Singh", reports: 31, resolved: 25, coins: 780, avatar: "VS", color: "#EF4444" },
  { rank: 6, name: "Anita Sharma", reports: 29, resolved: 22, coins: 720, avatar: "AS", color: "#14B8A6" },
  { rank: 7, name: "Priya Kumar", reports: 18, resolved: 14, coins: 285, avatar: "PK", color: "#8B5CF6", isMe: true },
];

export const mockCoinTransactions: CoinTransaction[] = [
  { date: "Jan 8", event: "Complaint submitted (ECO-2025-00042)", amount: 10, balance: 285, type: "earn" },
  { date: "Jan 6", event: "Complaint resolved (ECO-2025-00038)", amount: 20, balance: 275, type: "earn" },
  { date: "Jan 5", event: "Complaint submitted (ECO-2025-00038)", amount: 10, balance: 255, type: "earn" },
  { date: "Jan 3", event: "Weekly streak bonus", amount: 15, balance: 245, type: "bonus" },
  { date: "Dec 28", event: "Complaint submitted (ECO-2025-00031)", amount: 10, balance: 230, type: "earn" },
  { date: "Dec 26", event: "Complaint verified by authority", amount: 5, balance: 220, type: "earn" },
  { date: "Dec 25", event: "Complaint submitted (ECO-2025-00029)", amount: 10, balance: 215, type: "earn" },
  { date: "Dec 16", event: "Complaint resolved (ECO-2025-00021)", amount: 20, balance: 205, type: "earn" },
];

export const mockStaff: StaffMember[] = [
  { name: "Arun Patil", assigned: 24, resolved: 18, avg: "2.1 days", sla: "92%" },
  { name: "Deepa More", assigned: 19, resolved: 15, avg: "1.8 days", sla: "95%" },
  { name: "Sanjay Gupta", assigned: 22, resolved: 16, avg: "3.2 days", sla: "82%" },
  { name: "Priti Nair", assigned: 17, resolved: 14, avg: "1.5 days", sla: "98%" },
];

export const mockDepartments: Department[] = [
  { name: "Public Works", code: "PWD", assigned: 82, resolved: 61, sla: "72%", avg: "3.1d", staff: 4, escalated: 3 },
  { name: "Sanitation", code: "SAN", assigned: 64, resolved: 58, sla: "88%", avg: "1.8d", staff: 6, escalated: 1 },
  { name: "Water Supply", code: "WS", assigned: 45, resolved: 43, sla: "96%", avg: "1.2d", staff: 3, escalated: 0 },
  { name: "Electrical", code: "ELC", assigned: 38, resolved: 33, sla: "84%", avg: "2.4d", staff: 3, escalated: 2 },
  { name: "Environment", code: "ENV", assigned: 29, resolved: 22, sla: "78%", avg: "4.2d", staff: 2, escalated: 4 },
];

export const CATEGORIES = [
  { emoji: "🚗", label: "Road Damage" },
  { emoji: "🗑️", label: "Garbage" },
  { emoji: "🚰", label: "Sewage" },
  { emoji: "💡", label: "Lighting" },
  { emoji: "💧", label: "Water" },
  { emoji: "💨", label: "Air Quality" },
  { emoji: "🔊", label: "Noise" },
  { emoji: "❓", label: "Other" },
];
