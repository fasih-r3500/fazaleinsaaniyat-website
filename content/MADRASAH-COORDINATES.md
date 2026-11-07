# Madrasah coordinate record

`content/madrasahs.json` is the only source of map points. It has 20 rows, one per
madrasah. The task brief asks for a comment wherever a city coordinate is used, so this
file records those decisions. JSON cannot carry comments, so the record lives here and
beside the projection code in `lib/madrasahs.ts`.

## What the coordinates are

All 20 coordinates are city level positions. Each dot marks the town or city where a
madrasah operates. No coordinate implies a street address. The map is a country scale
locator, and the site table is the text record.

| IDs | Coordinate choice |
| --- | --- |
| M-001, M-002, M-004, M-005 | Karachi city coordinate. The brief names four neighbourhoods (Azizabad, Nagan Chowrangi, Orangi Town and Banaras) but does not supply neighbourhood coordinates. The city coordinate is used for all four and the map fans them around one city point. |
| M-003 | Chakwal city coordinate. |
| M-006 | The brief says Lodhra, Punjab. The design mock used Lodhran at 29.54, 71.63. That city coordinate is retained here and the spelling needs owner confirmation. |
| M-007, M-015 | Rahim Yar Khan city coordinate. |
| M-008, M-017 | Shikarpur city coordinate, the same point used as the outline anchor. |
| M-009, M-010 | Khipro town coordinate. The brief says Khipro, Sanghar, and does not distinguish a rural site from the town. The two rows stay separate and the map fans them. |
| M-011 | Muzaffargarh city coordinate. |
| M-012, M-016, M-018 | Ghotki city coordinate. |
| M-013, M-014 | Lahore city coordinate. M-014 is Raiwind, which the grouping treats as Lahore. The brief does not supply a Raiwind coordinate. |
| M-019 | Rajanpur town coordinate. The brief spells the place Rajan Pur. |
| M-020 | Khairpur city coordinate. |

## Counts

The supplied facts list four Karachi IDs: M-001, M-002, M-004 and M-005. The build uses
four. It does not add a fifth Karachi site. The design specification records a note that
says Karachi five times, and that disagreement is flagged to the owner rather than
resolved here.

M-009 and M-010 are two distinct rows even though both are Khipro, Sanghar.
