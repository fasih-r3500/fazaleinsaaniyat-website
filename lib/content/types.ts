/**
 * Record shapes for the content stores in `content/`.
 *
 * These types describe what the loader in `lib/content` exposes after validation.
 * Every value below comes from a file in this repository. Nothing is fetched at
 * runtime, so pages that read these records render as static HTML.
 */

export type LocalizedText = {
  en: string;
  ur: string | null;
};

export type FieldTripLanguage = "en" | "ur";

export type Money = {
  /** Amount in minor units. For PKR, 1 rupee is 100 minor units. */
  amountMinor: number;
  /** ISO 4217 currency code. Field trip costs are recorded in PKR. */
  currency: "PKR";
};

export type FieldTripDataFile = {
  /** Repository relative path, for example public/data/field-trips/2026-01.csv */
  path: string;
  /** Public URL derived from the path, for example /data/field-trips/2026-01.csv */
  url: string;
};

export type FieldTripPhoto = {
  /** Repository relative path, for example public/photos/field-trips/visit.jpg */
  path: string;
  /** Public URL derived from the path, for example /photos/field-trips/visit.jpg */
  url: string;
  /** Optional caption, also used as the image alt text. */
  caption: string | null;
};

export type FieldTripStat = {
  /** Short label, for example "Meals served". */
  label: string;
  /** The figure as text, so a trip can record "about 40" as easily as "40". */
  value: string;
};

/**
 * One field trip write-up. A field trip is one Markdown file in
 * `content/field-trips` with front matter, and the file name without `.md`
 * becomes the slug.
 */
export type FieldTrip = {
  slug: string;
  title: string;
  /** Publication date in YYYY-MM-DD form. */
  date: string;
  place: string;
  language: FieldTripLanguage;
  /** Optional. `null` means the write-up does not name who went or organised it. */
  organiser: string | null;
  /** Optional list of people or groups met. Empty when not recorded. */
  peopleMet: string[];
  /** Optional list of partners. Empty when not recorded. */
  partners: string[];
  /** Optional. `null` means the write-up does not record a household count. */
  householdsServed: number | null;
  /** Optional. `null` means the write-up does not record a cost. */
  cost: Money | null;
  /** Optional. `null` means no underlying data file is attached. */
  dataFile: FieldTripDataFile | null;
  /** Optional photos, in the order written. Empty when none are attached. */
  photos: FieldTripPhoto[];
  /** Optional label and value pairs for figures this trip actually holds. */
  stats: FieldTripStat[];
  /** Draft field trips are validated but never listed as published. */
  draft: boolean;
  /** The Markdown prose after the front matter block. */
  body: string;
  /** Repository relative path of the source file, for example content/field-trips/x.md */
  sourcePath: string;
};

export type InitiativeStatus = "active" | "paused" | "completed";

/**
 * One tile on an initiative page: a short label and the value it stands for.
 * The value is text so an initiative can show a number, a phrase or a date
 * without the content model changing. `numeric` is true when the value reads as
 * a plain number, which the page renders in the tabular figure style.
 */
export type InitiativeStat = {
  label: string;
  value: string;
  numeric: boolean;
};

export type InitiativePhoto = {
  /** Repository relative path, for example public/photos/water-pump.jpg */
  path: string;
  /** Public URL derived from the path, for example /photos/water-pump.jpg */
  url: string;
  /** Text alternative, required so every photo is described. */
  alt: string;
};

/**
 * One initiative. An initiative is one Markdown file in `content/initiatives`
 * with front matter, and the file name without `.md` becomes the slug.
 *
 * Only `title`, `summary`, `status` and `category` are required. Every other
 * field is null or an empty list when the file does not record it, and a page
 * renders nothing in place of an absent fact.
 */
export type Initiative = {
  slug: string;
  title: string;
  /** One plain sentence describing the initiative. */
  summary: string;
  status: InitiativeStatus;
  /** Short grouping label, for example "Water" or "Livelihood". */
  category: string;
  /** Places the initiative works in. Empty when not recorded. */
  locations: string[];
  /** Start date as YYYY-MM-DD or YYYY-MM, or null when not recorded. */
  startDate: string | null;
  /** End date in the same form, or null when the initiative has not ended. */
  endDate: string | null;
  /** The people or groups served, in the file's own words. */
  peopleServed: string[];
  /** Optional. `null` means the file does not record a household count. */
  householdsServed: number | null;
  /** Optional. `null` means the file does not record a cost. */
  cost: Money | null;
  /** What the recorded cost paid for, or null when not recorded. */
  costCovers: string | null;
  /** Charities or groups the work is done with. */
  partners: string[];
  photos: InitiativePhoto[];
  /** Free label and value pairs shown as tiles. Order follows the file. */
  stats: InitiativeStat[];
  /** Draft initiatives are validated but never listed as published. */
  draft: boolean;
  /** The Markdown prose after the front matter block. Empty when there is none. */
  body: string;
  /** Repository relative path of the source file. */
  sourcePath: string;
};

export type LedgerKind = "income" | "expenditure";

/**
 * One line of the public ledger: money in, money out or a project cost.
 * Entries live in `content/facts/ledger.json`.
 */
export type LedgerEntry = {
  id: string;
  /** Date the money moved, in YYYY-MM-DD form. */
  date: string;
  kind: LedgerKind;
  /** Short grouping label, for example "Donations" or "Project cost". */
  category: string;
  description: string;
  /** Positive amount in minor units, for example 450000 is PKR 4,500.00 */
  amountMinor: number;
  /** ISO 4217 currency code. */
  currency: string;
  /** Optional programme or project name. */
  project: string | null;
  /** Optional slug of a field trip that documents this entry. */
  fieldTripSlug: string | null;
  /** Optional repository relative path to a supporting file. */
  receiptPath: string | null;
};

export type LedgerTotal = {
  currency: string;
  incomeMinor: number;
  expenditureMinor: number;
};

/**
 * One figure the charity publishes. Figures live in `content/facts/figures.json`
 * and only hold values the charity has verified.
 */
export type PublishedFigure = {
  id: string;
  label: LocalizedText;
  value: number;
  /** Unit or noun for the value, for example "madrasahs" or "households". */
  unit: string;
  /** Date the figure is true as of, in YYYY-MM-DD form. */
  asOf: string;
  /** Optional slug of a field trip that documents this figure. */
  fieldTripSlug: string | null;
};

export type SocialPlatform = "instagram";

export type SocialMediaType = "image" | "video";

/**
 * One post in the build-time social snapshot. The entry lives in
 * `content/social/posts.json` and points at a local WebP poster, never at the
 * signed Instagram CDN URL, which expires within days.
 */
export type SocialPost = {
  platform: SocialPlatform;
  /** The original post URL. Every mosaic tile links to it. */
  url: string;
  /** The post's own timestamp, in UTC ISO 8601 form. */
  takenAt: string;
  /** The kind of post Instagram records, not the file committed here. */
  mediaType: SocialMediaType;
  /** Repository relative path, for example public/media/social/ABC123.webp */
  posterPath: string;
  /** Public URL derived from posterPath, for example /media/social/ABC123.webp */
  posterUrl: string;
  /** What the poster actually shows. */
  alt: string;
  /** Account that owns the post, without the @ symbol. */
  owner: string;
  /** Co-author named on the post, without the @ symbol, or null. */
  collaborator: string | null;
};

/**
 * Where a still came from. `public-page` means the charity published it on its
 * own public Facebook page and the file is committed. `unconfirmed` means a
 * still exists on the page but its origin is not established, so the site shows
 * a redacted placeholder instead of presenting it as a photograph.
 */
export type SocialProvenance = "public-page" | "unconfirmed";

/** The place a still is allowed to appear. */
export type SocialSlot = "mosques" | "water" | "hunar-ghar" | "field";

/**
 * One still from the charity's Facebook page. Entries live in
 * `content/social/facebook.json`, and every committed file sits under
 * `public/media/social/` as a WebP derivative.
 */
export type SocialImage = {
  id: string;
  slot: SocialSlot;
  /** Facebook photo id the still was downloaded from. */
  photoId: string;
  /** Permalink of the photo on Facebook. Each still links to it. */
  sourceUrl: string;
  sourceWidth: number;
  sourceHeight: number;
  sourceBytes: number;
  /** Public URL of the committed derivative, or null when unconfirmed. */
  src: string | null;
  width: number | null;
  height: number | null;
  bytes: number | null;
  provenance: SocialProvenance;
  /** Why a still is not shown, when it is not shown. */
  note: string | null;
  alt: LocalizedText;
};
