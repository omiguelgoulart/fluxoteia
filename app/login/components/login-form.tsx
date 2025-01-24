"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { API_BASE_URL } from '@/lib/config';


export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(event.target as HTMLFormElement)
    const data = {
      email: formData.get("email") as string,
      senha: formData.get("password") as string,
    }

    // Validação de entrada
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      setMessage("E-mail inválido.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.erro || "Erro ao fazer login")
      }

      const responseData = await response.json()

      // Armazena o token JWT no localStorage
      localStorage.setItem("token", responseData.token)

      // Redireciona o usuário para o dashboard
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof TypeError) {
        setMessage("Erro de conexão. Verifique sua internet.")
      } else {
        setMessage((error as Error).message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-[15px] text-gray-200">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@exemplo.com"
          required
          className="h-11 bg-black/40 border-0 text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-600"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-[15px] text-gray-200">
            Senha
          </label>
          <Link
            href="/login/password-recovery"
            className="text-[13px] text-gray-400 hover:text-white transition-colors"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Sua senha"
            required
            className="h-11 bg-black/40 border-0 text-gray-200 focus-visible:ring-1 focus-visible:ring-gray-600 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-11 w-11 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full h-11 bg-white text-black hover:bg-gray-100 transition-colors font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
      {message && <p className="text-center text-sm mt-2 text-red-500">{message}</p>}
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 bg-transparent border border-gray-800 text-white hover:bg-gray-900/50 transition-colors font-medium"
        onClick={() => alert("Login com Google ainda não implementado")}
      >
        Entrar com Google
      </Button>
    </form>
  )
}

