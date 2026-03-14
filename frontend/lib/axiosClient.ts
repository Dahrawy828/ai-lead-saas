import axios from "axios"
import { supabase } from "@/lib/supabase/client"

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
})

axiosClient.interceptors.request.use(
  async (config) => {

    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error("Supabase session error:", error)
      return config
    }

    const token = data.session?.access_token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosClient