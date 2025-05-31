import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Compass, CloudRain, Sun, Moon, MapPin } from "lucide-react"
import type { WeatherData } from "@/types/weather"

interface CurrentWeatherProps {
  data: WeatherData["current"]
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  const getWindDirection = (degrees: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ]
    return directions[Math.round(degrees / 22.5) % 16]
  }

  const getUVIndex = () => {
    // Simulação baseada na hora do dia (em produção viria da API)
    const hour = new Date().getHours()
    if (hour < 6 || hour > 18) return 0
    if (hour < 10 || hour > 16) return 3
    return 7
  }

  const getAirQuality = () => {
    // Simulação (em produção viria de outra API)
    return Math.floor(Math.random() * 100) + 1
  }

  const uvIndex = getUVIndex()
  const airQuality = getAirQuality()
  const isDay = data.weather[0].icon.includes("d")

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            <span>
              {data.name}, {data.sys.country}
            </span>
          </div>
          <Badge variant="secondary" className="flex items-center">
            {isDay ? <Sun className="w-3 h-3 mr-1" /> : <Moon className="w-3 h-3 mr-1" />}
            {new Date().toLocaleDateString("pt-BR")}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Temperatura principal */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={getWeatherIcon(data.weather[0].icon) || "/placeholder.svg"}
                alt={data.weather[0].description}
                className="w-24 h-24"
              />
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{Math.round(data.main.temp)}°C</div>
              <div className="text-lg text-muted-foreground capitalize font-medium">{data.weather[0].description}</div>
              <div className="text-sm text-muted-foreground">
                Sensação térmica: <span className="font-medium">{Math.round(data.main.feels_like)}°C</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Min: <span className="font-medium">{Math.round(data.main.temp_min)}°</span> | Max:{" "}
                <span className="font-medium"> {Math.round(data.main.temp_max)}°</span>
              </div>
            </div>
          </div>

          {/* Detalhes meteorológicos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Droplets className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">Umidade</div>
                  <div className="text-lg font-bold">{data.main.humidity}%</div>
                  <Progress value={data.main.humidity} className="w-16 h-1 mt-1" />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">Vento</div>
                  <div className="text-lg font-bold">{data.wind.speed} m/s</div>
                  <div className="text-xs text-muted-foreground">
                    {getWindDirection(data.wind.deg)} ({data.wind.deg}°)
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Gauge className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">Pressão</div>
                  <div className="text-lg font-bold">{data.main.pressure}</div>
                  <div className="text-xs text-muted-foreground">hPa</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">Visibilidade</div>
                  <div className="text-lg font-bold">{(data.visibility / 1000).toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">km</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Sun className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="text-sm font-medium">Índice UV</div>
                  <div className="text-lg font-bold">{uvIndex}</div>
                  <div className="text-xs text-muted-foreground">
                    {uvIndex <= 2 ? "Baixo" : uvIndex <= 5 ? "Moderado" : uvIndex <= 7 ? "Alto" : "Muito Alto"}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CloudRain className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Qualidade do Ar</div>
                  <div className="text-lg font-bold">{airQuality}</div>
                  <div className="text-xs text-muted-foreground">
                    {airQuality <= 50 ? "Boa" : airQuality <= 100 ? "Moderada" : "Ruim"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sol e coordenadas */}
        <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Sunrise className="w-5 h-5 text-orange-500" />
            <div>
              <div className="text-sm font-medium">Nascer do sol</div>
              <div className="text-lg font-bold">{formatTime(data.sys.sunrise)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Sunset className="w-5 h-5 text-orange-600" />
            <div>
              <div className="text-sm font-medium">Pôr do sol</div>
              <div className="text-lg font-bold">{formatTime(data.sys.sunset)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Compass className="w-5 h-5 text-gray-500" />
            <div>
              <div className="text-sm font-medium">Coordenadas</div>
              <div className="text-sm font-mono">
                {data.coord?.lat?.toFixed(2)}°, {data.coord?.lon?.toFixed(2)}°
              </div>
            </div>
          </div>
        </div>

        {/* Timestamp */}
        <div className="mt-4 pt-4 border-t text-center">
          <div className="text-xs text-muted-foreground">
            Última atualização: {new Date(data.dt * 1000).toLocaleString("pt-BR")}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
