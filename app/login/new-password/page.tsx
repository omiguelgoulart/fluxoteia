import { NewPasswordForm } from "../components/new-password-form";


export default function NewPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-[400px] p-8 rounded-xl bg-[#111111]/90 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Criar Nova Senha</h1>
            <p className="text-[15px] text-gray-400">
              Digite e confirme sua nova senha abaixo
            </p>
          </div>
          <NewPasswordForm />
        </div>
      </div>
    </div>
  )
}

