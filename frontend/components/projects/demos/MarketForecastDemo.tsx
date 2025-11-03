"use client"

import { useMemo } from "react"
import { useRandomData } from "@/hooks/use-random-data"
import { MarketForecastChart } from "./visualizations/MarketForecastChart"

/**
 * Market Forecast Engine demo component.
 * 
 * Displays animated line chart visualization showing historical prices and forecast predictions.
 * Chart demonstrates machine learning model predictions with volatility analysis.
 */
export function MarketForecastDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const historical = randomData.generateStockPrices(20, 150)
    const forecast = randomData.generateStockPrices(5, historical[historical.length - 1])
    
    // Format data for chart
    const historicalChartData = historical.map((price, i) => ({
      day: `Day ${i + 1}`,
      price: price,
    }))
    
    const forecastChartData = forecast.map((price, i) => ({
      day: `F${i + 1}`,
      price: price,
    }))
    
    return { historicalChartData, forecastChartData }
  }, [randomData])

  return (
    <MarketForecastChart
      historicalData={demoData.historicalChartData}
      forecastData={demoData.forecastChartData}
    />
  )
}
