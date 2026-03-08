"use client"

import LeadTable from "@/components/lead_table"
import { useLeads } from "@/hooks/useLeads"
import AuthGuard from "@/components/auth/AuthGuard"

export default function LeadsPage() {
  const { leads } = useLeads()

  return (
    <AuthGuard>
        <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Leads</h1>

        <LeadTable data={leads} />
        </div>
    </AuthGuard>
  )
}