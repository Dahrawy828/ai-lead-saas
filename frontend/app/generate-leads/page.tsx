"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/auth/AuthGuard"
import { api } from "@/services/api"
import { useLeadStore } from "@/store/leadStore"

type FormData = {
  industry: string
  country: string
  city?: string
  company_size?: string
  keywords?: string
  requested_limit: number
}

export default function GenerateLeadsPage() {

  const { register, handleSubmit } = useForm<FormData>()
  const router = useRouter()

  const setLeads = useLeadStore((state) => state.setLeads)

  const onSubmit = async (data: FormData) => {
    try {

      const response = await api.generateLeads(data)

      if (response.success) {

        // Save leads in Zustand
        setLeads(response.leads)

        // Redirect to leads page
        router.push("/leads")

      }

    } catch (error) {
      console.error("Error generating leads:", error)
    }
  }

  return (
    <AuthGuard>

      <div className="p-10 max-w-xl">

        <h1 className="text-2xl font-bold mb-6">
          Generate Leads
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            placeholder="Industry"
            {...register("industry")}
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="Country"
            {...register("country")}
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="City"
            {...register("city")}
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="Company Size"
            {...register("company_size")}
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="Keywords"
            {...register("keywords")}
            className="border p-2 w-full rounded"
          />

          <input
            type="number"
            defaultValue={10}
            {...register("requested_limit")}
            className="border p-2 w-full rounded"
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Generate Leads
          </button>

        </form>

      </div>

    </AuthGuard>
  )
}