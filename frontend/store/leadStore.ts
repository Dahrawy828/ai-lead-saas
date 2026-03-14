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
  setLeads: (leads: Lead[]) => void
}

export const useLeadStore = create<LeadState>((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads }),
}))