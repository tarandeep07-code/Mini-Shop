//app/checkout/success/page.tsx
 import SuccessClient from "@/components/SuccessClient";
 import { use } from "react";

//import { readFileSync } from "fs";

interface SuccessPageProps {
  searchParams: { session_id?: string };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  // ✅ Await searchParams if needed
  const params = use(Promise.resolve(searchParams));
  const sessionId = params.session_id;

  if (!sessionId) {
    return <p className="p-10 text-center">No session ID provided</p>;
  }

  return <SuccessClient sessionId={sessionId} />;
}

