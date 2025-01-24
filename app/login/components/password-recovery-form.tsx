'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PasswordRecoveryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Simular o envio do email de recuperação
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <p className="text-green-400">
          Um email com instruções para redefinir sua senha foi enviado.
        </p>
        <p className="text-gray-400">
          Verifique sua caixa de entrada e siga as instruções para recuperar sua senha.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-[15px] text-gray-200">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="m@exemplo.com"
          required
          className="h-11 bg-black/40 border-0 text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-600"
        />
      </div>
      <Button
        type="submit"
        className="w-full h-11 bg-white text-black hover:bg-gray-100 transition-colors font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar email de recuperação"}
      </Button>
    </form>
  )
}

