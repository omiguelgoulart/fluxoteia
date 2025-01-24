'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { API_BASE_URL } from '@/lib/config';

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter(); // Hook para redirecionamento

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Validação de senha
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    const data = { nome: name, email: email, senha: password };

    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || 'Erro ao cadastrar usuário.');
      }

      // Redireciona para a página de login após o cadastro bem-sucedido
      setMessage('Usuário cadastrado com sucesso! Redirecionando...');
      setTimeout(() => router.push('/login'), 2000); // Delay para exibir a mensagem antes do redirecionamento
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-[15px] text-gray-200">
          Nome
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Seu nome completo"
          required
          className="h-11 bg-black/40 border-0 text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-600"
        />
      </div>
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
        <label htmlFor="password" className="block text-[15px] text-gray-200">
          Senha
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          required
          className="h-11 bg-black/40 border-0 text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-600"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-[15px] text-gray-200">
          Confirmar Senha
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
          required
          className="h-11 bg-black/40 border-0 text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-600"
        />
      </div>
      <Button
        type="submit"
        className="w-full h-11 bg-white text-black hover:bg-gray-100 transition-colors font-medium"
        disabled={isLoading}
      >
        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
      {message && (
        <p className={`text-center text-sm mt-2 ${message.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
