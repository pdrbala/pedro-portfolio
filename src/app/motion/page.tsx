import type { Metadata } from "next";
import { MotionShowcase } from "@/components/motion/MotionShowcase";

export const metadata: Metadata = {
  title: "Motion",
  description: "Selected video and motion work by Pedro Guilherme.",
};

export default function MotionPage() {
  return <MotionShowcase />;
}
