export function formatPay(
  minimum: number | null,
  maximum: number | null,
  period = "hour",
) {
  if (minimum === null && maximum === null) return "Pay shown on application";

  const suffix = period === "year" ? "/year" : "/hour";
  const money = (amount: number) =>
    period === "year"
      ? `$${amount.toLocaleString("en-US")}`
      : `$${amount.toFixed(0)}`;

  if (minimum !== null && maximum !== null) {
    return `${money(minimum)}–${money(maximum)}${suffix}`;
  }

  return `${money((minimum ?? maximum) as number)}${suffix}`;
}

export function formatPostedAt(date: Date) {
  const days = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)),
  );

  if (days === 0) return "Posted today";
  if (days === 1) return "Posted yesterday";
  return `Posted ${days} days ago`;
}

export function formatSourceDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
