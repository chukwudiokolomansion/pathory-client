export function getFormattedDate(dateString) {
  if (!dateString) return new Date().toISOString().split("T")[0];

  return new Date(dateString).toISOString().split("T")[0];
}

export function createPlannerSlug({ title }) {
  if (!title) return "planner";

  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function convertSlugToName(slug) {
  if (!slug) return "";

  return slug
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatPlannerStatus(status) {
  switch (status) {
    case "pending":
      return "🟡 Pending";
    case "in-progress":
      return "🔵 In Progress";
    case "completed":
      return "🟢 Completed";
    case "cancelled":
      return "🔴 Cancelled";
    default:
      return "Unknown";
  }
}

export function formatPlannerDuration(startDate, endDate) {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate).toLocaleDateString();
  const end = new Date(endDate).toLocaleDateString();

  return `${start} → ${end}`;
}