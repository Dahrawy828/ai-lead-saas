"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import AuthGuard from "@/components/auth/AuthGuard"

export default function DashboardPage() {

  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <AuthGuard>

      <div className="p-10">

        <h1 className="text-3xl font-bold mb-4">
          AI Lead SaaS Dashboard
        </h1>

        <p className="mb-4">
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

    </AuthGuard>
  )
}