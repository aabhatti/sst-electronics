"use client";
import { useRouter } from "next/navigation";

export default function NavigateTo({ location = "" }) {
  const router = useRouter();

  return () => router.push(location);
}
