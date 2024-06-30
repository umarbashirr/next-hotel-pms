import { NextRequest } from "next/server";

export function getQueryParams(req: NextRequest, query: string) {
  const searchParams = req.nextUrl.searchParams;
  return searchParams.get(query) || "";
}
