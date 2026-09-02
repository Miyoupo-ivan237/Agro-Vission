'use client';

import Link from 'next/link';

export default function Sidebar() {
  return <nav aria-label="Admin navigation" className="p-4 space-y-2"><Link href="/dashboard">Dashboard</Link><Link href="/users">Users</Link><Link href="/diagnoses">Diagnoses</Link><Link href="/reports">Reports</Link></nav>;
}
