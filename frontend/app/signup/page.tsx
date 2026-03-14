"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

import SignupForm from "@/components/auth/SignupForm"

export default function SignupPage() {

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
          Create Account
        </h1>

        <SignupForm />

      </div>

    </div>

  )
}