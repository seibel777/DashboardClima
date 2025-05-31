import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(request: NextRequest) {
  try {
    // Verificar se a API key está configurada
    if (!API_KEY) {
      console.error("OPENWEATHER_API_KEY não está configurada")
      return NextResponse.json({ error: "Chave da API não configurada no servidor" }, { status: 500 })
    }

    // Extrair parâmetros da URL
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")

    if (!city) {
      return NextResponse.json({ error: "Nome da cidade é obrigatório" }, { status: 400 })
    }

    console.log(`Buscando clima para: ${city}`)

    // Buscar dados atuais do clima
    const currentUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`

    console.log("Fazendo requisição para OpenWeather API...")

    const currentResponse = await fetch(currentUrl, {
      method: "GET",
      headers: {
        "User-Agent": "WeatherDashboard/1.0",
      },
    })

    console.log("Status da resposta atual:", currentResponse.status)

    if (!currentResponse.ok) {
      const errorText = await currentResponse.text()
      console.error("Erro na resposta da API:", errorText)

      if (currentResponse.status === 404) {
        return NextResponse.json(
          { error: "Cidade não encontrada. Verifique o nome e tente novamente." },
          { status: 404 },
        )
      }
      if (currentResponse.status === 401) {
        return NextResponse.json({ error: "Chave da API inválida" }, { status: 401 })
      }

      return NextResponse.json(
        { error: `Erro da API do clima: ${currentResponse.status}` },
        { status: currentResponse.status },
      )
    }

    const currentData = await currentResponse.json()
    console.log("Dados atuais recebidos para:", currentData.name)

    // Buscar previsão de 5 dias
    const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`

    console.log("Buscando previsão...")

    const forecastResponse = await fetch(forecastUrl, {
      method: "GET",
      headers: {
        "User-Agent": "WeatherDashboard/1.0",
      },
    })

    let forecastData = null
    if (forecastResponse.ok) {
      forecastData = await forecastResponse.json()
      console.log("Dados de previsão recebidos:", forecastData.list?.length || 0, "itens")
    } else {
      console.warn("Erro ao buscar previsão:", forecastResponse.status)
      // Não falhar se a previsão não funcionar
    }

    const result = {
      current: currentData,
      forecast: forecastData,
    }

    console.log("Retornando dados completos")

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // Cache por 5 minutos
      },
    })
  } catch (error) {
    console.error("Erro detalhado na API:", error)

    // Verificar se é erro de rede
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json({ error: "Erro de conexão com o serviço de clima. Tente novamente." }, { status: 503 })
    }

    // Erro genérico
    return NextResponse.json(
      { error: `Erro interno do servidor: ${error instanceof Error ? error.message : "Erro desconhecido"}` },
      { status: 500 },
    )
  }
}

// Adicionar suporte para OPTIONS (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
