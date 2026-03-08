import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage() {

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