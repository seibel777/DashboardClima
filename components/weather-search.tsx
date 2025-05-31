"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Globe, Clock } from "lucide-react"
import { popularCities, majorCities } from "@/data/cities"

interface WeatherSearchProps {
  onSearch: (city: string) => void
  isLoading: boolean
}

export function WeatherSearch({ onSearch, isLoading }: WeatherSearchProps) {
  const [city, setCity] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Carregar buscas recentes do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("weather-recent-searches")
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved))
        } catch (e) {
          console.error("Erro ao carregar buscas recentes:", e)
        }
      }
    }
  }, [])

  // Algoritmo de busca inteligente
  const getSuggestions = useMemo(() => {
    return (query: string): string[] => {
      if (!query || query.length < 2) return []

      const lowerQuery = query.toLowerCase().trim()
      const results: string[] = []
      const exactMatches: string[] = []
      const startsWithMatches: string[] = []
      const containsMatches: string[] = []
      const majorMatches: string[] = []

      // Verificar cidades principais primeiro
      for (const cityName of majorCities) {
        const lowerCity = cityName.toLowerCase()
        if (lowerCity === lowerQuery) {
          exactMatches.push(cityName)
        } else if (lowerCity.startsWith(lowerQuery)) {
          majorMatches.push(cityName)
        } else if (lowerCity.includes(lowerQuery)) {
          majorMatches.push(cityName)
        }
      }

      // Verificar todas as cidades
      for (const cityName of popularCities) {
        if (majorMatches.includes(cityName) || exactMatches.includes(cityName)) continue

        const lowerCity = cityName.toLowerCase()
        if (lowerCity === lowerQuery) {
          exactMatches.push(cityName)
        } else if (lowerCity.startsWith(lowerQuery)) {
          startsWithMatches.push(cityName)
        } else if (lowerCity.includes(lowerQuery)) {
          containsMatches.push(cityName)
        }
      }

      // Combinar resultados
      results.push(...exactMatches)
      results.push(...majorMatches.slice(0, 5))
      results.push(...startsWithMatches.slice(0, 5))
      results.push(...containsMatches.slice(0, 3))

      return results.slice(0, 8)
    }
  }, [])

  // Filtrar sugestões
  useEffect(() => {
    if (city.trim().length > 1) {
      const filtered = getSuggestions(city)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
    setActiveSuggestion(-1)
  }, [city, getSuggestions])

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      const searchCity = city.trim()
      onSearch(searchCity)
      setShowSuggestions(false)

      // Salvar busca recente
      if (typeof window !== "undefined") {
        const newRecent = [searchCity, ...recentSearches.filter((c) => c !== searchCity)].slice(0, 5)
        setRecentSearches(newRecent)
        localStorage.setItem("weather-recent-searches", JSON.stringify(newRecent))
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveSuggestion((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter" && activeSuggestion >= 0) {
      e.preventDefault()
      selectSuggestion(suggestions[activeSuggestion])
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setCity(suggestion)
    setShowSuggestions(false)
    onSearch(suggestion)

    // Salvar busca recente
    if (typeof window !== "undefined") {
      const newRecent = [suggestion, ...recentSearches.filter((c) => c !== suggestion)].slice(0, 5)
      setRecentSearches(newRecent)
      localStorage.setItem("weather-recent-searches", JSON.stringify(newRecent))
    }
  }

  const quickCities = ["São Paulo", "New York", "London", "Tokyo", "Paris", "Sydney"]

  return (
    <div className="space-y-4">
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Digite o nome de qualquer cidade do mundo..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => city.trim().length > 1 && setSuggestions(getSuggestions(city))}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10"
              disabled={isLoading}
              autoComplete="off"
            />
            {city.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setCity("")
                  setSuggestions([])
                  setShowSuggestions(false)
                  inputRef.current?.focus()
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
          <Button type="submit" disabled={isLoading || !city.trim()} className="min-w-[100px]">
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>
        </form>

        {/* Sugestões de autocompletar */}
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-80 overflow-auto"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  index === activeSuggestion ? "bg-gray-50 dark:bg-gray-700" : ""
                } ${index === 0 ? "rounded-t-lg" : ""} ${index === suggestions.length - 1 ? "rounded-b-lg" : ""}`}
                onClick={() => selectSuggestion(suggestion)}
                onMouseEnter={() => setActiveSuggestion(index)}
              >
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-blue-500" />
                  <span className="font-medium">{suggestion}</span>
                  {majorCities.includes(suggestion) && (
                    <span className="ml-auto text-xs text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                      Popular
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buscas recentes */}
      {recentSearches.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            <span>Recentes:</span>
          </div>
          {recentSearches.map((recentCity) => (
            <Button
              key={recentCity}
              variant="ghost"
              size="sm"
              onClick={() => onSearch(recentCity)}
              disabled={isLoading}
              className="text-xs h-7 px-2"
            >
              {recentCity}
            </Button>
          ))}
        </div>
      )}

      {/* Cidades populares */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Populares:</span>
        {quickCities.map((popularCity) => (
          <Button
            key={popularCity}
            variant="outline"
            size="sm"
            onClick={() => selectSuggestion(popularCity)}
            disabled={isLoading}
            className="text-xs h-7 px-3"
          >
            {popularCity}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-center text-xs text-muted-foreground">
        <Globe className="w-3 h-3 mr-1" />
        <span>Busca inteligente com mais de 200 cidades mundiais</span>
      </div>
    </div>
  )
}
