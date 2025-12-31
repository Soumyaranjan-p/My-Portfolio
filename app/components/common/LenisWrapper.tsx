// app/components/common/LenisWrapper.tsx
"use client";

import { useLenis } from "@/app/hooks/useLenis";
import { ReactNode } from "react";

export default function LenisWrapper({ children }: { 
  children: ReactNode 
}) {
  useLenis();
  return <>{children}</>;  // ✅ No type conflicts
}
