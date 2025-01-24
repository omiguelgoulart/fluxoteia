import { SignupForm } from "../components/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-[400px] p-8 rounded-xl bg-[#111111]/90 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Cadastro</h1>
          </div>
          <SignupForm />
          <div className="text-center text-[13px]">
            <span className="text-gray-400">Já tem uma conta? </span>
            <Link 
              href="/login" 
              className="text-white hover:underline ml-1"
            >
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
