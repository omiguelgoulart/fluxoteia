'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setIsLoading(true)

    try {
      // Simular a atualização da senha
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (error) {
      console.error(error)
      setError('Ocorreu um erro ao atualizar sua senha. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <p className="text-green-400">
          Sua senha foi atualizada com sucesso!
        </p>
        <p className="text-gray-400">
          Você já pode fazer login com sua nova senha.
        </p>
        <Button
          onClick={() => window.location.href = '/login'}
          className="w-full h-11 bg-white text-black hover:bg-gray-100 transition-colors font-medium"
        >
          Ir para o login
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="password" className="block text-[15px] text-gray-200">
          Nova Senha
        </label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 bg-black/40 border-0 text-gray-200 focus-visible:ring-1 focus-visible:ring-gray-600"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-[15px] text-gray-200">
          Confirmar Nova Senha
        </label>
        <Input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="h-11 bg-black/40 border-0 text-gray-200 focus-visible:ring-1 focus-visible:ring-gray-600"
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      <Button
        type="submit"
        className="w-full h-11 bg-white text-black hover:bg-gray-100 transition-colors font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Atualizando..." : "Atualizar Senha"}
      </Button>
    </form>
  )
}

