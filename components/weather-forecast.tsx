import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Wind, Thermometer } from "lucide-react"
import type { WeatherData } from "@/types/weather"

interface WeatherForecastProps {
  data: WeatherData["forecast"]
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  if (!data) return null

  // Pegar previsões para os próximos 5 dias (uma por dia ao meio-dia)
  const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 5)

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  const formatDay = (timestamp: number, index: number) => {
    if (index === 0) return "Hoje"
    if (index === 1) return "Amanhã"
    return new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
      weekday: "short",
    })
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Previsão dos Próximos 5 Dias</span>
          <Badge variant="outline">{data.city.name}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dailyForecasts.map((forecast, index) => (
            <div
              key={forecast.dt}
              className="relative p-4 rounded-xl border-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {/* Dia */}
              <div className="text-center mb-3">
                <div className="font-bold text-lg text-gray-900 dark:text-white">{formatDay(forecast.dt, index)}</div>
                <div className="text-sm text-muted-foreground">{formatDate(forecast.dt)}</div>
              </div>

              {/* Ícone e descrição */}
              <div className="text-center mb-3">
                <img
                  src={getWeatherIcon(forecast.weather[0].icon) || "/placeholder.svg"}
                  alt={forecast.weather[0].description}
                  className="w-16 h-16 mx-auto"
                />
                <div className="text-xs text-center text-muted-foreground capitalize mt-1">
                  {forecast.weather[0].description}
                </div>
              </div>

              {/* Temperatura */}
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.round(forecast.main.temp)}°C
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(forecast.main.temp_min)}° / {Math.round(forecast.main.temp_max)}°
                </div>
              </div>

              {/* Detalhes extras */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <Droplets className="w-3 h-3 mr-1 text-blue-500" />
                    <span>{forecast.main.humidity}%</span>
                  </div>
                  <div className="flex items-center">
                    <Wind className="w-3 h-3 mr-1 text-gray-500" />
                    <span>{forecast.wind.speed.toFixed(1)} m/s</span>
                  </div>
                </div>

                <div className="flex items-center justify-center text-xs">
                  <Thermometer className="w-3 h-3 mr-1 text-orange-500" />
                  <span>Sensação: {Math.round(forecast.main.feels_like)}°C</span>
                </div>
              </div>

              {/* Indicador de hoje */}
              {index === 0 && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-blue-500 text-white text-xs">Hoje</Badge>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Informações adicionais */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <strong>Cidade:</strong> {data.city.name}, {data.city.country}
            </div>
            <div>
              <strong>População:</strong> {data.city.population?.toLocaleString() || "N/A"}
            </div>
            <div>
              <strong>Fuso horário:</strong> UTC{data.city.timezone >= 0 ? "+" : ""}
              {(data.city.timezone / 3600).toFixed(0)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
