import { create } from "zustand"

export interface Lead {
  company_name: string
  website: string
  email: string
  linkedin: string
  score: number
  status: string
}

interface LeadState {
  leads: Lead[]
  search: string
  statusFilter: string

  setLeads: (leads: Lead[]) => void
  setSearch: (search: string) => void
  setStatusFilter: (status: string) => void
}

export const useLeadStore = create<LeadState>((set) => ({
  leads: [],
  search: "",
  statusFilter: "all",

  setLeads: (leads) => set({ leads }),

  setSearch: (search) => set({ search }),

  setStatusFilter: (statusFilter) => set({ statusFilter }),
}))