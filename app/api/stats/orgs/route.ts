import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

import { isStatsAllowed } from '../../../../lib/statsAllow';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type OrgRow = { id: string; name: string; slug: string | null };

export async function GET() {
  const { allowed } = await isStatsAllowed();
  if (!allowed) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const client = await clerkClient();
  const out: OrgRow[] = [];

  // Clerk paginates; fetch all organizations (admin-only).
  let offset = 0;
  const limit = 100;
  for (let i = 0; i < 20; i++) {
    const res: any = await (client as any).organizations.getOrganizationList({ limit, offset });
    const data: any[] = Array.isArray(res?.data) ? res.data : [];
    for (const o of data) {
      if (!o?.id || !o?.name) continue;
      out.push({ id: String(o.id), name: String(o.name), slug: o.slug ? String(o.slug) : null });
    }
    if (data.length < limit) break;
    offset += data.length;
  }

  out.sort((a, b) => a.name.localeCompare(b.name));
  return NextResponse.json({ orgs: out }, { status: 200 });
}

