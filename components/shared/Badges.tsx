import type { Status, Priority } from "@/lib/mockData";
import { statusLabel, priorityLabel, statusColor, priorityColor } from "@/lib/utils";

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge ${statusColor(status)}`}>{statusLabel(status)}</span>;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={`badge ${priorityColor(priority)}`}>{priorityLabel(priority)}</span>;
}
