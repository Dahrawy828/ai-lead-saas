import { useEffect } from "react"
import { api } from "@/services/api"
import { useLeadStore } from "@/store/leadStore"

export function useLeads() {
  const { leads, setLeads } = useLeadStore()

  useEffect(() => {
    async function loadLeads() {
      try {
        const data = await api.getLeads()
        setLeads(data.leads || [])
      } catch (error) {
        console.error("Failed to fetch leads", error)
      }
    }

    loadLeads()
  }, [])

  return { leads }
}