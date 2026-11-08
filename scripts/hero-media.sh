#!/usr/bin/env bash
# Rebuild the hero film derivatives from the master clip.
#
#   scripts/hero-media.sh path/to/master.mp4
#
# The master is 848x464, so the 1440 file is a 1.7x upscale and the 720 file is
# the honest size for a handset. Both are H.264 MP4 with no audio track and no
# metadata, and both are heavily compressed because the hero wash hides the
# detail: the film reads as texture and light behind the copy.
#
# Outputs, with the budgets the hero is held to:
#   public/media/hero/hero-1440.mp4   desktop, up to 1440 wide
#   public/media/hero/hero-720.mp4    phones, up to 720 wide
#   public/media/hero/hero-poster.webp  first paint and reduced motion
#
# Desktop hero weight must stay near 2 MB and the phone hero near 700 KB,
# counting the poster. The script fails when a budget is blown.
set -euo pipefail

src=${1:?usage: scripts/hero-media.sh <master.mp4>}
out=public/media/hero
log=$(mktemp -d)
trap 'rm -rf "$log"' EXIT

command -v ffmpeg >/dev/null || { echo "ffmpeg is required" >&2; exit 1; }

mkdir -p "$out"

common=(-an -sn -dn -map_metadata -1 -map_chapters -1 -fflags +bitexact)

# Desktop: 24 fps is plenty for a background film and cuts the bitrate.
ffmpeg -v error -y -i "$src" "${common[@]}" \
  -vf "scale=1440:-2:flags=lanczos,hqdn3d=4:3:6:4,fps=24" \
  -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p \
  -b:v 545k -maxrate 640k -bufsize 1090k -preset slow -g 48 \
  -x264-params "ref=3:bframes=3" -pass 1 -passlogfile "$log/desktop" \
  -flags:v +bitexact -f mp4 /dev/null
ffmpeg -v error -y -i "$src" "${common[@]}" \
  -vf "scale=1440:-2:flags=lanczos,hqdn3d=4:3:6:4,fps=24" \
  -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p \
  -b:v 545k -maxrate 640k -bufsize 1090k -preset slow -g 48 \
  -x264-params "ref=3:bframes=3" -pass 2 -passlogfile "$log/desktop" \
  -flags:v +bitexact -movflags +faststart "$out/hero-1440.mp4"

# Phones: same treatment at 720 wide, under 220 kbps.
ffmpeg -v error -y -i "$src" "${common[@]}" \
  -vf "scale=720:-2:flags=lanczos,hqdn3d=3:2:4:3,fps=24" \
  -c:v libx264 -profile:v main -level 3.1 -pix_fmt yuv420p \
  -b:v 180k -maxrate 220k -bufsize 360k -preset slow -g 48 \
  -pass 1 -passlogfile "$log/phone" -flags:v +bitexact -f mp4 /dev/null
ffmpeg -v error -y -i "$src" "${common[@]}" \
  -vf "scale=720:-2:flags=lanczos,hqdn3d=3:2:4:3,fps=24" \
  -c:v libx264 -profile:v main -level 3.1 -pix_fmt yuv420p \
  -b:v 180k -maxrate 220k -bufsize 360k -preset slow -g 48 \
  -pass 2 -passlogfile "$log/phone" -flags:v +bitexact \
  -movflags +faststart "$out/hero-720.mp4"

# Poster: one frame from the desktop file, so it matches what plays after it.
ffmpeg -v error -y -ss 9 -i "$out/hero-1440.mp4" -frames:v 1 \
  -c:v libwebp -quality 60 -compression_level 6 -map_metadata -1 \
  -fflags +bitexact -flags:v +bitexact "$out/hero-poster.webp"

size() { stat -f%z "$1" 2>/dev/null || stat -c%s "$1"; }

poster=$(size "$out/hero-poster.webp")
desktop=$(( $(size "$out/hero-1440.mp4") + poster ))
phone=$(( $(size "$out/hero-720.mp4") + poster ))

printf 'desktop hero %s bytes, phone hero %s bytes, poster %s bytes\n' \
  "$desktop" "$phone" "$poster"

[ "$desktop" -le 2000000 ] || { echo "desktop hero over 2 MB" >&2; exit 1; }
[ "$phone" -le 700000 ] || { echo "phone hero over 700 KB" >&2; exit 1; }
