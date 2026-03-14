import axiosClient from "@/lib/axiosClient"

export interface GenerateLeadsPayload {
  industry: string
  country: string
  city?: string
  company_size?: string
  keywords?: string
  requested_limit?: number
}

export const api = {

  generateLeads: async (data: GenerateLeadsPayload) => {
    const response = await axiosClient.post("/generate-leads", data)
    return response.data
  },

  getLeads: async () => {
    const response = await axiosClient.get("/leads")
    return response.data
  },

  getAnalytics: async () => {
    const response = await axiosClient.get("/analytics")
    return response.data
  }

}