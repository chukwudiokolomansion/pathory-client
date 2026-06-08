export function getStatustedDate(dateString) {
  if (!dateString) dateString = new Date().toISOString();
  return dateString.split('T')[0];
}

export function convertSlugToName(slug) {
  return slug
    .replaceAll("-", " ")
    .toUpperCase()
    .slice(0, slug.length - 2);
}

export function createPlannerSlug({ status, destination, title, startDate }) {
  const plannerStatus = getStatusAcronym(status);
  const plannerDestination = getDestinationAcronym(destination);

  const plannerTitle = title.length === 0 ? "title" : title.toLowerCase();
  const plannerStartDate = startDate.length === 0 ? "startDate" : startDate;

  return `${plannerStatus}-${plannerDestination}-${plannerTitle}-${plannerStartDate}`;
}

function getDestinationAcronym(destination) {
  switch (destination) {
    case "Paris":
      return "pa";
    case "Munich":
      return "mu";
    case "Berlin":
      return "be";
    default:
      return "destination";
  }
}

function getStatusAcronym(status) {
  switch (status) {
    case "Pending":
      return "pe";
    case "Completed":
      return "co";
    default:
      return "status";
  }
}
