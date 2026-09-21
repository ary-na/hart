export type NewestFirstItem = {
  _id: string;
  createdAt?: string | Date | null;
};

const timestamp = (value: NewestFirstItem) => {
  if (value.createdAt) {
    const time = new Date(value.createdAt).getTime();
    if (Number.isFinite(time)) return time;
  }

  if (/^[a-f0-9]{24}$/i.test(value._id)) {
    return parseInt(value._id.slice(0, 8), 16) * 1000;
  }

  return 0;
};

export const compareNewestFirst = (a: NewestFirstItem, b: NewestFirstItem) => {
  const byDate = timestamp(b) - timestamp(a);
  if (byDate !== 0) return byDate;
  return b._id.localeCompare(a._id);
};

export const sortNewestFirst = <T extends NewestFirstItem>(items: T[]) =>
  [...items].sort(compareNewestFirst);

export const paintingAlt = (title?: string | null) =>
  title?.trim()
    ? `Original animal portrait: ${title.trim()}`
    : "Original animal portrait";

export type PublicArtworkImage = {
  thumbnailUrl?: string | null;
  fileUrl?: string | null;
};

export const hasPublicArtworkImage = (drawing: PublicArtworkImage) =>
  Boolean(drawing.thumbnailUrl?.trim() || drawing.fileUrl?.trim());

export const withPublicArtworkImage = <T extends PublicArtworkImage>(items: T[]) =>
  items.filter(hasPublicArtworkImage);

/** Data attrs so CSS can fill leftover tracks instead of leaving empty grid holes. */
export const wallPackProps = (count: number) => ({
  "data-count": String(count),
  "data-pack-sm": String(count % 2),
  "data-pack-lg": String(count % 3),
});
