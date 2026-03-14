import type { Priority, Status } from "@/lib/mockData";

export function statusLabel(s: Status): string {
  const m: Record<Status, string> = {
    pending: "Pending",
    under_review: "Under Review",
    assigned: "Assigned",
    in_progress: "In Progress",
    resolved: "Resolved",
    rejected: "Rejected",
  };
  return m[s] ?? s;
}

export function priorityLabel(p: Priority): string {
  return p.charAt(0).toUpperCase() + p.slice(1);
}

export function statusColor(s: Status): string {
  const m: Record<Status, string> = {
    pending: "badge-amber",
    under_review: "badge-purple",
    assigned: "badge-blue",
    in_progress: "badge-blue",
    resolved: "badge-green",
    rejected: "badge-red",
  };
  return m[s] ?? "badge-gray";
}

export function priorityColor(p: Priority): string {
  const m: Record<Priority, string> = {
    high: "badge-red",
    medium: "badge-amber",
    low: "badge-blue",
  };
  return m[p] ?? "badge-gray";
}
