"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { WeatherSearch } from "@/components/weather-search"
import { CurrentWeather } from "@/components/current-weather"
import { WeatherForecast } from "@/components/weather-forecast"
import { Footer } from "@/components/footer"
import type { WeatherData } from "@/types/weather"
import { Cloud, AlertCircle, Shield, Sparkles } from "lucide-react"

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchWeather = useCallback(async (city: string) => {
    setLoading(true)
    setError(null)

    try {
      console.log("🔍 Buscando clima para:", city)

      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      console.log("📡 Status da resposta:", response.status)

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text()
        console.error("❌ Resposta não é JSON:", textResponse.substring(0, 200))
        throw new Error("Erro no servidor. Resposta inválida recebida.")
      }

      const data = await response.json()
      console.log("✅ Dados recebidos para:", data.current?.name)

      if (!response.ok) {
        throw new Error(data.error || `Erro HTTP: ${response.status}`)
      }

      if (!data.current) {
        throw new Error("Dados do clima não encontrados na resposta")
      }

      setWeatherData(data)
    } catch (err) {
      console.error("❌ Erro ao buscar clima:", err)

      let errorMessage = "Erro desconhecido"

      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === "string") {
        errorMessage = err
      }

      // Mensagens de erro mais amigáveis
      if (errorMessage.includes("fetch")) {
        errorMessage = "Erro de conexão. Verifique sua internet e tente novamente."
      } else if (errorMessage.includes("JSON")) {
        errorMessage = "Erro no servidor. Tente novamente em alguns instantes."
      }

      setError(errorMessage)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Cloud className="w-16 h-16 text-blue-500 mr-4" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard de Clima
              </h1>
              <div className="flex items-center justify-center mt-2">
                <Shield className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">API Protegida & Segura</span>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Consulte condições meteorológicas em tempo real de qualquer cidade do mundo com dados precisos e atualizados
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <WeatherSearch onSearch={searchWeather} isLoading={loading} />
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Alert variant="destructive" className="mb-6 shadow-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Ops! Algo deu errado:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="col-span-full lg:col-span-2 shadow-lg">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-32" />
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Weather Data */}
        {weatherData && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            <CurrentWeather data={weatherData.current} />

            {/* Stats adicionais */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <h3 className="font-bold text-xl text-center">Informações Extras</h3>

                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Cidade</span>
                        <span className="font-bold text-blue-900 dark:text-blue-100">{weatherData.current.name}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">País</span>
                        <span className="font-bold text-green-900 dark:text-green-100">
                          {weatherData.current.sys.country}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Timezone</span>
                        <span className="font-bold text-purple-900 dark:text-purple-100">
                          UTC{weatherData.current.timezone >= 0 ? "+" : ""}
                          {(weatherData.current.timezone / 3600).toFixed(0)}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                          Última atualização
                        </span>
                        <span className="font-bold text-orange-900 dark:text-orange-100 text-sm">
                          {new Date(weatherData.current.dt * 1000).toLocaleTimeString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t text-center">
                    <div className="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
                      <Shield className="w-4 h-4 mr-2" />
                      <span className="font-medium">Dados seguros e confiáveis</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <WeatherForecast data={weatherData.forecast} />
          </div>
        )}

        {/* Welcome message */}
        {!weatherData && !loading && !error && (
          <Card className="text-center py-16 shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
            <CardContent>
              <div className="relative inline-block mb-6">
                <Cloud className="w-24 h-24 text-blue-500 mx-auto" />
                <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
              </div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bem-vindo ao Dashboard de Clima
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                Digite o nome de uma cidade para começar a explorar as condições meteorológicas em tempo real
              </p>
              <div className="flex items-center justify-center text-sm text-green-600 dark:text-green-400">
                <Shield className="w-4 h-4 mr-2" />
                <span className="font-medium">Sua privacidade está protegida - API segura no servidor</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
