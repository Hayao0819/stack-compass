"use client";
import { useSession } from "next-auth/react";

export default function InfoPage() {
  const { data } = useSession();
  return JSON.stringify(data);
}
