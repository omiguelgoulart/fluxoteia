import { LoginForm } from "./components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-[400px] p-8 rounded-xl bg-[#111111]/90 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Login</h1>
          </div>
          <LoginForm />
          <div className="text-center text-[13px]">
            <span className="text-gray-400">Não tem uma conta? </span>
            <Link 
              href="/login/cadastro" 
              className="text-white hover:underline ml-1"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

