"use client";

import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/**
 * Custom video player — brutalist controls (no raw browser chrome).
 * Click-to-play/pause, accent scrub bar, time, mute, fullscreen.
 * Autoplays with sound (opened via a click gesture); falls back to muted.
 */
export function VideoPlayer({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setTime(v.currentTime);
    const onMeta = () => setDur(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVol = () => setMuted(v.muted);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVol);
    // opened via a click → try sound; if blocked, mute and play
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVol);
    };
  }, []);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }
  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  }
  function seek(e: MouseEvent<HTMLDivElement>) {
    const v = videoRef.current;
    if (!v || !dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * dur;
  }
  function fullscreen() {
    wrapRef.current?.requestFullscreen?.();
  }

  const pct = dur ? (time / dur) * 100 : 0;

  return (
    <div ref={wrapRef} className={cn("group relative bg-black", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        onClick={toggle}
        className="h-full w-full cursor-pointer object-contain"
      />

      {/* center play badge while paused */}
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-background/85 text-foreground transition-transform hover:scale-110">
            <Play className="ml-1 fill-current" size={24} />
          </span>
        </button>
      )}

      {/* controls bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-3 pt-10 pb-3 sm:px-4">
        <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="shrink-0 text-white transition-colors hover:text-accent">
          {playing ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current" />}
        </button>
        <div onClick={seek} className="relative h-1 flex-1 cursor-pointer bg-white/25">
          <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${pct}%` }} />
        </div>
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-white/80">
          {fmt(time)} / {fmt(dur)}
        </span>
        <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="shrink-0 text-white transition-colors hover:text-accent">
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <button type="button" onClick={fullscreen} aria-label="Fullscreen" className="shrink-0 text-white transition-colors hover:text-accent">
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}
