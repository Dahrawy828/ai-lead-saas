import { useEffect, useMemo } from "react"
import { api } from "@/services/api"
import { useLeadStore } from "@/store/leadStore"

export function useLeads() {

  const leads = useLeadStore((state) => state.leads)
  const setLeads = useLeadStore((state) => state.setLeads)

  const search = useLeadStore((state) => state.search)
  const statusFilter = useLeadStore((state) => state.statusFilter)

  useEffect(() => {

    if (leads.length > 0) return

    async function loadLeads() {
      try {
        const data = await api.getLeads()
        setLeads(data.leads || [])
      } catch (error) {
        console.error("Failed to fetch leads", error)
      }
    }

    loadLeads()

  }, [leads, setLeads])

  const filteredLeads = useMemo(() => {

    return leads.filter((lead) => {

      const matchesSearch =
        lead.company_name.toLowerCase().includes(search.toLowerCase()) ||
        lead.website.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter

      return matchesSearch && matchesStatus

    })

  }, [leads, search, statusFilter])

  return { leads: filteredLeads }
}