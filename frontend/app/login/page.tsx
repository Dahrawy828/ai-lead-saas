"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage() {

  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (user) return null

  return (

    <div className="flex items-center justify-center min-h-screen">

      <div className="w-full max-w-md p-8 space-y-6">

        <h1 className="text-2xl font-bold text-center">
          Login
        </h1>

        <LoginForm />

      </div>

    </div>

  )
}