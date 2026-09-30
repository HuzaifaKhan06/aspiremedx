// Practice-detail options shared by the custom builder and the quote modal.
// `value` is what gets emailed; `label`/`hint` are what the builder shows.

export const PRACTICE_SIZES = [
  { value: "1 Provider (Solo)", label: "Solo", hint: "1 provider", dots: 1 },
  { value: "2–5 Providers", label: "Small", hint: "2–5 providers", dots: 2 },
  { value: "6–15 Providers", label: "Growing", hint: "6–15 providers", dots: 3 },
  { value: "16–30 Providers", label: "Group", hint: "16–30 providers", dots: 4 },
  { value: "31–50 Providers", label: "Large", hint: "31–50 providers", dots: 5 },
  { value: "50+ Providers", label: "Enterprise", hint: "50+ providers", dots: 6 },
];

export const CLAIM_VOLUMES = [
  { value: "Under 500 claims / month", label: "Under 500" },
  { value: "500–2,000 claims / month", label: "500 – 2,000" },
  { value: "2,000–5,000 claims / month", label: "2,000 – 5,000" },
  { value: "5,000+ claims / month", label: "5,000+" },
];

export const CURRENT_SETUPS = [
  { value: "In-house billing team", label: "In-house team", hint: "Our own staff bill today" },
  { value: "Another billing company", label: "Another company", hint: "Looking to switch vendors" },
  { value: "Starting a new practice", label: "New practice", hint: "Setting up from scratch" },
];
