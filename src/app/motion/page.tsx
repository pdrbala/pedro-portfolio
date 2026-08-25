"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Legacy /motion route — the motion world now lives at "/". */
export default function MotionRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <Link
      href="/"
      className="label flex min-h-[70vh] items-center justify-center text-muted underline underline-offset-4 transition-colors hover:text-accent"
    >
      Pedro Guilherme® — home
    </Link>
  );
}
