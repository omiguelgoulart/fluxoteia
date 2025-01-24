
import Link from "next/link"
import { PasswordRecoveryForm } from "../components/password-recovery-form"

export default function PasswordRecoveryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-[400px] p-8 rounded-xl bg-[#111111]/90 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Recuperar Senha</h1>
            <p className="text-[15px] text-gray-400">
              Digite seu email para receber instruções de recuperação de senha
            </p>
          </div>
          <PasswordRecoveryForm />
          <div className="text-center text-[13px]">
            <Link 
              href="/login" 
              className="text-white hover:underline"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

