import { useEffect } from "react"
import { api } from "@/services/api"
import { useLeadStore } from "@/store/leadStore"

export function useLeads() {

  const leads = useLeadStore((state) => state.leads)
  const setLeads = useLeadStore((state) => state.setLeads)

  useEffect(() => {

    // If leads already exist (generated from form), don't fetch again
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

  return { leads }
}