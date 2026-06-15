import type { NextRequest } from "next/server";
import { handleContactPost } from "@/lib/contact-handler";

export async function POST(request: NextRequest) {
  return handleContactPost(request);
}
