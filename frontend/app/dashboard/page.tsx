"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useAuth } from "@/hooks/useAuth"
import AuthGuard from "@/components/auth/AuthGuard"
import ChartCard from "@/components/chart_card"
import { api } from "@/services/api"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

type LeadsPerDay = {
  date: string
  leads: number
}

type ScoreDistribution = {
  score: string
  count: number
}

type IndustryData = {
  name: string
  value: number
}

export default function DashboardPage() {

  const { user, signOut } = useAuth()
  const router = useRouter()

  const [leadsPerDay, setLeadsPerDay] = useState<LeadsPerDay[]>([])
  const [scoreDistribution, setScoreDistribution] = useState<ScoreDistribution[]>([])
  const [industries, setIndustries] = useState<IndustryData[]>([])

  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"]

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  useEffect(() => {

    const loadAnalytics = async () => {

      try {

        const data = await api.getAnalytics()

        setLeadsPerDay(data.leads_per_day || [])
        setScoreDistribution(data.score_distribution || [])
        setIndustries(data.industries || [])

      } catch (error) {

        console.error("Analytics error:", error)

      }

    }

    loadAnalytics()

  }, [])

  return (
    <AuthGuard>

      <div className="p-10 space-y-10">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold mb-4">
            AI Lead SaaS Dashboard
          </h1>

          <p>
            Logged in as:
          </p>

          <p className="font-semibold mb-6">
            {user?.email}
          </p>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Logout
          </button>

        </div>

        {/* Analytics */}

        <div>

          <h2 className="text-2xl font-semibold mb-6">
            Analytics
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Leads Per Day */}

            <ChartCard title="Leads Generated Per Day">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={leadsPerDay}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="date" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </ChartCard>

            {/* Lead Score Distribution */}

            <ChartCard title="Lead Score Distribution">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={scoreDistribution}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="score" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="count" fill="#16a34a" />

                </BarChart>

              </ResponsiveContainer>

            </ChartCard>

            {/* Top Industries */}

            <ChartCard title="Top Industries">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={industries}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {industries.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </ChartCard>

          </div>

        </div>

      </div>

    </AuthGuard>
  )
}