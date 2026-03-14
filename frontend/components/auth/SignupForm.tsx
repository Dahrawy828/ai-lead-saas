"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { supabase } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupForm() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4">

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Sign Up"}
      </Button>

      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>

    </form>
  )
}