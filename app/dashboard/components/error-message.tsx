import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-destructive/15 border border-destructive text-destructive px-4 py-2 rounded-md flex items-center">
      <AlertCircle className="h-4 w-4 mr-2" />
      <span>{message}</span>
    </div>
  )
}

