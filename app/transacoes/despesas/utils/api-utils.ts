import axios from "axios"

interface CupomData {
  nome: string
  valor: string
  data: string
  number: string | null
}

export async function fetchCupomData(url: string): Promise<CupomData> {
  try {
    const backendURL = "https://leitor-cupom-fiscal-9ota.vercel.app"
    const response = await axios.get(`${backendURL}/api/cupom/buscar-dados`, {
      params: { url },
    })

    return response.data as CupomData
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error)
    throw new Error("Falha ao buscar dados do cupom fiscal")
  }
}

