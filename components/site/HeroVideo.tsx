"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP_SRC = "/media/hero/hero-1440.mp4";
const PHONE_SRC = "/media/hero/hero-720.mp4";

// The film is 848 pixels wide, so the 1440 file is an upscale for a full width
// hero and the 720 file is the honest one for a handset. A phone never gets the
// desktop bytes, and Save-Data pulls the small file on a desktop too.
const PHONE_WIDTH = "(max-width: 760px)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type SaveDataConnection = { saveData?: boolean };

function saveDataRequested() {
  const navigatorWithConnection = navigator as Navigator & {
    connection?: SaveDataConnection;
  };
  return navigatorWithConnection.connection?.saveData === true;
}

function posterOnly() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

function sourceForViewport() {
  if (saveDataRequested() || window.matchMedia(PHONE_WIDTH).matches) {
    return PHONE_SRC;
  }
  return DESKTOP_SRC;
}

// Decorative background film for the hero. The poster is painted by CSS, in the
// server HTML, so the first paint never waits for JavaScript. The video is only
// mounted when motion is welcome, and it only becomes visible once it is really
// playing: a browser that blocks autoplay, or fails to decode, leaves the poster
// in place instead of a frozen first frame.
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia(REDUCED_MOTION);

    const sync = () => {
      setIsPlaying(false);
      setHasFailed(false);
      setSrc(posterOnly() ? null : sourceForViewport());
    };

    sync();
    motionQuery.addEventListener("change", sync);
    return () => motionQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const attempt = video.play();
    if (attempt) {
      attempt.catch(() => setHasFailed(true));
    }

    return () => {
      video.pause();
    };
  }, [src]);

  return (
    <div
      aria-hidden="true"
      className={isPlaying ? "hero-media is-playing" : "hero-media"}
    >
      {src && !hasFailed ? (
        <video
          ref={videoRef}
          autoPlay
          disablePictureInPicture
          loop
          muted
          onError={() => setHasFailed(true)}
          onPlaying={() => setIsPlaying(true)}
          playsInline
          preload="metadata"
          src={src}
          tabIndex={-1}
        />
      ) : null}
    </div>
  );
}
