"use client"

import { useForm } from "react-hook-form"
import axiosClient from "@/lib/axiosClient"
import AuthGuard from "@/components/auth/AuthGuard"

type FormData = {
  industry: string
  country: string
  city?: string
  company_size?: string
  keywords?: string
  limit: number
}

export default function GenerateLeadsPage() {

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axiosClient.post("/generate-leads", data)
      console.log("Generated Leads:", res.data.leads)
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
            {...register("limit")}
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