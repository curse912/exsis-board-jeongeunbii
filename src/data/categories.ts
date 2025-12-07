export const BOARD_CATEGORIES = [
  "공지",
  "자유",
  "공포",
  "유머",
  "잡담",
] as const;

export type BoardCategory = (typeof BOARD_CATEGORIES)[number];