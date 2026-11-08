# Content

Field trips, ledger entries and published figures are plain files in this
repository. Adding a record means adding a file. No page component changes, and
there is no database, no external CMS, no account to sign in to and no network
call at runtime.

| What | Where | Format |
| --- | --- | --- |
| Field trips | `content/field-trips/*.md` | Markdown with YAML front matter, one file per trip |
| Money in, money out, project costs | `content/facts/ledger.json` | JSON |
| Figures the charity publishes | `content/facts/figures.json` | JSON |
| Social snapshot for the home mosaic | `content/social/posts.json` | JSON, written by `scripts/social-snapshot.mjs` |

`lib/content` is the only code that reads these files. It finds each file,
checks it, sorts records newest first and returns typed records. Page code
imports from `@/lib/content`. The module reads from disk, so it belongs in
server components and build time code, never in a client component. Nothing is
fetched in the browser.

## Adding a field trip

1. Copy `content/field-trips/_template.md`.
2. Save the copy in the same folder under a new file name. Use lowercase
   letters, numbers and single hyphens. A date at the front keeps the folder
   tidy, for example `2026-01-water-pumps.md`.
3. Fill in the fields between the two `---` lines.
4. Write the trip as prose under the second `---` line.
5. Run `npm run build` to check the file.

Write short paragraphs and leave a blank line between them. A line that starts
with a hyphen and a space makes a bullet list item. A line that starts with `#`
becomes a section heading; every trip heading renders as a second level heading
under the trip title, so the page never skips a heading level. Nothing in the
prose is passed through as raw HTML.

The file name without `.md` becomes the field trip slug.
`2026-01-water-pumps.md` has the slug `2026-01-water-pumps`, which is the
address of the page.

Every field trip file in the folder is found automatically. There is no index
file to update and no page code to change.

The front matter of a filled in trip looks like this:

```yaml
---
title: Title of the field trip
date: YYYY-MM-DD
place: Town or city, district
language: en
# optional lines, remove the leading # to use one
# organiser: A name or a team
# peopleMet:
#   - Name or group
# partners:
#   - Organisation name
# householdsServed: <number of households>
# costPkr: <whole rupees>
# dataFile: public/data/field-trips/<file name>
# photos:
#   - path: public/photos/field-trips/<file name>
#     caption: What the photo shows
# stats:
#   - label: Meals served
#     value: "40"
# draft: true
---
```

Everything after the second `---` line is the prose. Leave a blank line between
paragraphs, start a bullet list with a hyphen and a space, and keep any figures
in the fields above rather than only in the text.

Files whose names start with `_` or `.` are ignored by the loader. The template
uses an underscore so it can never be published by accident.

### Front matter fields

The block between the two `---` lines is YAML. One `field: value` per line.
Only the first four fields are required. Everything else is optional, and a
field that is left out is simply not shown.

| Field | Required | Meaning |
| --- | --- | --- |
| `title` | yes | The title of the trip, in the language it is written in. |
| `date` | yes | The date of the trip, written as `YYYY-MM-DD`. Trips are sorted newest first by this date. |
| `place` | yes | The place the trip went to, for example a town and district. |
| `language` | yes | The language of the prose: `en` for English, `ur` for Urdu. |
| `organiser` | no | Who went, or who organised the trip. Plain text. |
| `peopleMet` | no | A list of the people or groups met, one per line. |
| `partners` | no | A list of the partners who helped, one per line. |
| `householdsServed` | no | A whole number of households reached. |
| `costPkr` | no | The cost in whole rupees. No commas, no decimal point. |
| `dataFile` | no | A path to an underlying data file, which must sit under `public/`. |
| `photos` | no | A list of photos. Each has a `path` under `public/` and an optional `caption`. |
| `stats` | no | A list of `label` and `value` pairs for any other figures the trip holds. |
| `draft` | no | `true` keeps the trip out of the published listing. Default is `false`. |

Text values that contain a colon (`:`) or a hash (`#`) must be wrapped in
quotes, because YAML treats those characters specially:

```yaml
title: "Water pumps: Shikarpur district"
```

Leave an optional field out when the detail is not known. Do not write `0`,
`TBC` or a guess: an omitted field means "not recorded", which is honest. A
page renders nothing for a field that is absent. It does not print a
placeholder that suggests a fact is missing.

### What the fields become

| Front matter | Record field | Note |
| --- | --- | --- |
| `organiser: Ayesha Khan` | `organiser: "Ayesha Khan"` | `null` when omitted. |
| `peopleMet` | `peopleMet: string[]` | Empty list when omitted. |
| `partners` | `partners: string[]` | Empty list when omitted. |
| `householdsServed: 25` | `householdsServed: 25` | `null` when omitted. |
| `costPkr: 45000` | `cost: { amountMinor: 4500000, currency: "PKR" }` | Money is stored in minor units to avoid rounding. |
| `dataFile: public/data/field-trips/name.csv` | `dataFile: { path, url }` | `url` is `/data/field-trips/name.csv`. |
| `photos` | `photos: { path, url, caption }[]` | The first photo is the cover on the index. |
| `stats` | `stats: { label, value }[]` | Values are kept as text, so "about 40" is allowed. |
| the prose below the block | `body` | Raw Markdown string. |

### Who was there

`organiser` is one line of text. Use it for the person or team who went, or for
whoever organised the trip:

```yaml
organiser: Ayesha Khan, with the local teacher
```

`peopleMet` and `partners` are lists. Write one item per line, each starting
with a hyphen and a space:

```yaml
peopleMet:
  - The teacher and her class
  - Three families in the village
partners:
  - Quran Mehal, Lodhra
```

The page shows each list only when it has items. An empty list, or no list at
all, is not an error.

### Photos

Put the image file under `public/photos/field-trips/` and list its path from the
repository root. A caption is optional. The first photo in the list becomes the
cover photo on the index.

```yaml
photos:
  - path: public/photos/field-trips/2026-01-visit.jpg
    caption: The class on the day of the visit.
```

The loader checks that every photo file exists and sits under `public/`. It
does not check the image size or format. Keep photos small enough to load on a
phone, and do not publish a photo of a person without their permission.

### Stats

`stats` holds any figure the trip actually has. Each item has a `label` and a
`value`. Add as many items as the trip needs, with no schema change:

```yaml
stats:
  - label: Meals served
    value: "40"
  - label: Teachers met
    value: 6
```

A value may be a number or text. Use text when the figure is approximate, for
example `"about 40"`. Quotes are needed around text values.

`householdsServed` and `costPkr` already become their own tiles on the page, so
use `stats` for everything else. If a trip has no tile figures at all, leave
both the fields and `stats` out. The page then shows no tiles.

### Drafts

Add `draft: true` to keep a trip out of every published listing while it is
still being checked. The file is still validated, so it cannot go stale, and
`getDraftFieldTrips()` returns it for an internal preview. Remove the line, or
set `draft: false`, to publish it.

### Attaching the underlying data

Put the file under `public/data/field-trips/` and point `dataFile` at it from
the repository root:

```yaml
dataFile: public/data/field-trips/name-of-file.csv
```

The loader checks that the file exists and that it sits under `public/`. Do not
put personal or household identifying information in a public data file.

## Ledger entries

`content/facts/ledger.json` holds one list. An empty store is valid:

```json
{
  "entries": []
}
```

Each entry is one line of the public ledger. Shape example only, every value
below is a placeholder and is not published:

```json
{
  "entries": [
    {
      "id": "example-id",
      "date": "YYYY-MM-DD",
      "kind": "expenditure",
      "category": "Example category",
      "description": "What the money was for.",
      "amountMinor": 100,
      "currency": "PKR",
      "project": "Optional programme name",
      "fieldTripSlug": "optional-field-trip-file-name",
      "receipt": "content/ledger/optional-supporting-file.pdf"
    }
  ]
}
```

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | A unique reference for the entry. Letters, numbers and single hyphens. |
| `date` | yes | The date the money moved, written as `YYYY-MM-DD`. |
| `kind` | yes | `income` for money in, `expenditure` for money out or a project cost. |
| `category` | yes | A short grouping label, for example `Donations` or `Project cost`. |
| `description` | yes | One plain sentence saying what the money was for. |
| `amountMinor` | yes | The amount in minor units, a whole number greater than zero. |
| `currency` | yes | Three uppercase letters, for example `PKR`. |
| `project` | no | The programme or project the entry belongs to. |
| `fieldTripSlug` | no | The file name of a field trip that documents this entry, without `.md`. It must exist. |
| `receipt` | no | A repository path to a supporting file. It must exist. It is not linked publicly. |

Money is stored in minor units so totals never drift. For PKR, one rupee is 100
minor units:

| Amount | `amountMinor` |
| --- | --- |
| PKR 50 | `5000` |
| PKR 4,500 | `450000` |
| PKR 45,000.50 | `4500050` |

Totals are never added across currencies. `ledgerTotals()` returns one total per
currency, and an empty ledger returns an empty list rather than zeros.

## Published figures

`content/facts/figures.json` holds the numbers the charity publishes, each with
the date it is true as of. An empty store is valid:

```json
{
  "figures": []
}
```

Shape example only, every value below is a placeholder and is not published:

```json
{
  "figures": [
    {
      "id": "example-id",
      "label": { "en": "Example label", "ur": null },
      "value": 1,
      "unit": "example unit",
      "asOf": "YYYY-MM-DD",
      "fieldTripSlug": "optional-field-trip-file-name"
    }
  ]
}
```

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | A unique reference for the figure. Letters, numbers and single hyphens. |
| `label` | yes | An object with `en` text and an optional `ur` text or `null`. |
| `value` | yes | The number, without quotes. |
| `unit` | yes | The noun for the value, for example `madrasahs`. |
| `asOf` | yes | The date the figure is true as of, written as `YYYY-MM-DD`. |
| `fieldTripSlug` | no | A field trip that documents the figure. It must exist. |

Write `"ur": null` when the Urdu wording has not had a native review. The site
treats a null Urdu value as pending, following the existing site convention.

## Social snapshot

`content/social/posts.json` is the build-time snapshot behind the home page
social strip. It holds one entry per post and never holds a signed Instagram CDN
URL, because those expire within days. Each entry points at a committed WebP
poster under `public/media/social/`.

Regenerate it with:

```bash
npm run social:snapshot
```

The post list and the hand-written alt text live in that script. It fetches each
single post page, extracts the media JSON, downloads one still, converts it to a
720px wide WebP and writes the manifest sorted by the post's own timestamp,
newest first. It writes no manifest when any entry fails, so the last good manifest
stays in place. Video is not downloaded: a video post shows its poster
and links to the original post.

| Field | Required | Meaning |
| --- | --- | --- |
| `platform` | yes | `instagram`. |
| `url` | yes | The original post or reel URL. Every tile links to it. |
| `takenAt` | yes | The post's own timestamp, as `YYYY-MM-DDTHH:MM:SSZ`. |
| `mediaType` | yes | `image` or `video`, as Instagram records the post. |
| `poster` | yes | Repository path to the WebP poster, under `public/media/social/`. |
| `alt` | yes | What the poster shows. Written by hand, with no invented claim. |
| `owner` | yes | The account that owns the post, without the `@`. |
| `collaborator` | yes | A named co-author without the `@`, or `null`. |

A missing or empty manifest means the social strip is not rendered at all. The
page does not show an empty shell.

## Empty stores

Zero field trips, zero ledger entries, zero figures and an empty social manifest are all valid. The
loader returns empty lists, and `lib/content` exports ready made copy so no page
has to invent a fallback:

| Export | Shown when |
| --- | --- |
| `fieldTripsEmptyState` | no trip is published, on `/field-trips` |
| `ledgerEmptyState` | the ledger has no entries, on `/transparency` |
| `figuresEmptyState` | no figure is published, on `/transparency` |

Each is `{ title, body }`, where both are `{ en, ur }`. Render that copy instead
of an empty table or a zero total. Nothing is fabricated to fill the space.

## What happens when a field is missing or malformed

The build stops with one message listing every problem, grouped by file. For
example:

```
Content validation failed with 2 problems.

content/field-trips/2026-01-water-pumps.md
  - missing required field "date"
  - field "language" must be "en" or "ur", found "english"

Fix the file and run the build again. See docs/CONTENT.md.
```

The check runs when `next.config.ts` loads, so `npm run build` fails before any
page renders, and `npm run dev` refuses to start on invalid content. The field
trip index, the field trip pages and the transparency ledger all read these
stores, so `npm run build` is also the quick way to check the files.
Restart the dev server after editing a content file so the check runs again.

| Message | Fix |
| --- | --- |
| `front matter is missing` | The file must start with a `---` line, then the fields, then a second `---` line. |
| `front matter is not closed` | Add the second `---` line after the last field. |
| `front matter is not valid YAML` | Usually an unquoted colon or hash. Wrap the value in quotes. |
| `missing required field "date"` | Add the field. Check the spelling of the field name too. |
| `unknown field "houseHoldServed"` | The field name is not part of the model. The message lists the allowed names. |
| `must be a whole number, found the text "12"` | Remove the quotes. Numbers are written bare. |
| `must be a real date written as YYYY-MM-DD` | Use `2026-01-05`, not `5 January 2026`, and check the day exists. |
| `must be a list; write each item on its own line starting with "- "` | Use a YAML list for `peopleMet`, `partners`, `photos` or `stats`. |
| `must point inside public/` | Move the data file or photo under `public/` and update the path. |
| `points at "..." but that file does not exist` | Check the path spelling, from the repository root. |
| `points at "..." but no field trip with that file name exists` | The `fieldTripSlug` must match a file in `content/field-trips` without `.md`. |
| `field trips must be Markdown files directly inside content/field-trips, not folders` | Field trips are one level deep, one file per trip. |
| `field trip files must end in .md` | Rename the file. Other extensions are rejected rather than ignored. |
| `field "stats[0].value" must be text or a number` | Write a number without quotes, or put the text in quotes. |
| `field "photos[0].path"` errors | Each photo needs a `path` that exists under `public/`. |

## Editorial rules

- Do not invent a fact, figure, place or date. If it is not confirmed, leave
  the optional field out and say in the prose that it is pending.
- No em dashes anywhere on this site. Use commas, colons or full stops.
- Write prose in the trip's language and set `language` to match.
- Only publish a figure after the field team has verified it. The figure store
  is a record of what has been verified, not a scratchpad.

## For page code

Everything comes from `@/lib/content`:

| Function | Returns |
| --- | --- |
| `getPublishedFieldTrips()` | Published field trips, newest first. Drafts excluded. |
| `getDraftFieldTrips()` | Draft field trips, for an internal preview only. |
| `getLatestFieldTrip()` | The newest published field trip, or `null`. |
| `getFieldTripBySlug(slug)` | One published field trip, or `null`. |
| `getLedger()` | Ledger entries, newest first. |
| `getLedgerTotals()` | One total per currency, empty when the ledger is empty. |
| `getFigures()` | Published figures, newest first. |
| `loadSocialPosts()` | Social posts, newest first. An empty manifest returns `[]`. |
| `assertContentValid()` | Throws on any invalid content file. |

Record shapes are documented in `lib/content/types.ts`. A field trip carries
`slug`, `title`, `date`, `place`, `language`, `organiser`, `peopleMet`,
`partners`, `householdsServed`, `cost`, `dataFile`, `photos`, `stats`, `draft`,
`body` and `sourcePath`. Amounts are in minor units, so format them in one
shared helper rather than in each page.

`next.config.ts` lists the content files in `outputFileTracingIncludes`, so the
host receives them along with the built server output. Keep that entry if a
page reads content at request time. Prefer rendering field trips at build time
with `generateStaticParams`, which keeps the strict Content Security Policy
intact: no inline scripts and no client side data fetching.

The old `/reports` addresses permanently redirect to `/field-trips`, including
the Urdu tree under `/ur/reports`, so an old link does not 404.
