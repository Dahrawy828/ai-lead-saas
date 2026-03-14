"use client"

import LeadTable from "@/components/lead_table"
import { useLeads } from "@/hooks/useLeads"
import AuthGuard from "@/components/auth/AuthGuard"
import { useLeadStore } from "@/store/leadStore"

export default function LeadsPage() {

  const { leads } = useLeads()

  const search = useLeadStore((state) => state.search)
  const setSearch = useLeadStore((state) => state.setSearch)

  const statusFilter = useLeadStore((state) => state.statusFilter)
  const setStatusFilter = useLeadStore((state) => state.setStatusFilter)

  return (
    <AuthGuard>

      <div className="p-8 space-y-6">

        <h1 className="text-2xl font-bold">Leads</h1>

        {/* Filters */}

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="discovered">Discovered</option>
            <option value="analyzed">Analyzed</option>
            <option value="contacted">Contacted</option>
          </select>

        </div>

        <LeadTable data={leads} />

      </div>

    </AuthGuard>
  )
}