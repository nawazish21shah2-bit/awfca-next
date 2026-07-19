"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Site } from "@/lib/cms/types";

export function SiteSelector({ sites }: { sites: Site[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current =
    searchParams.get("site") ??
    sites.find((s) => s.code === "ca")?.id ??
    sites[0]?.id ??
    "";

  return (
    <label className="admin-site-selector">
      <span>Site</span>
      <select
        value={current}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("site", e.target.value);
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        {sites.map((site) => (
          <option key={site.id} value={site.id}>
            {site.name} ({site.code.toUpperCase()})
            {!site.is_active ? " — inactive" : ""}
          </option>
        ))}
      </select>
    </label>
  );
}
