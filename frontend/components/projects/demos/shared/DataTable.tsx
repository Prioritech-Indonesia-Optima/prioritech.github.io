"use client"

import { useEffect, useState } from "react"

/**
 * DataTable component for terminal-styled data display.
 * 
 * Provides animated row-by-row appearance, column headers, syntax highlighting,
 * loading shimmer effect, and responsive column width.
 * 
 * @param headers - Array of column header labels
 * @param rows - Array of row data (arrays of strings)
 * @param animate - Whether to animate row appearance
 * @param highlightColumns - Column indices to highlight
 * 
 * @returns Terminal-styled data table with animations
 */
interface DataTableProps {
  headers: string[]
  rows: string[][]
  animate?: boolean
  highlightColumns?: number[]
}

export function DataTable({
  headers,
  rows,
  animate = true,
  highlightColumns = []
}: DataTableProps) {
  const [visibleRows, setVisibleRows] = useState<number>(animate ? 0 : rows.length)

  useEffect(() => {
    if (!animate) return

    let currentVisible = 0
    const interval = setInterval(() => {
      currentVisible++
      setVisibleRows(currentVisible)
      
      if (currentVisible >= rows.length) {
        clearInterval(interval)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [rows.length, animate])

  const getColumnClass = (colIndex: number): string => {
    if (highlightColumns.includes(colIndex)) {
      return "text-accent font-semibold"
    }
    return "text-secondary"
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="border-b border-accent/20">
            {headers.map((header, i) => (
              <th
                key={i}
                className="text-left px-4 py-2 text-accent/60 text-xs uppercase tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rows.slice(0, visibleRows).map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-accent/10 transition-opacity duration-200"
              style={{
                animation: animate ? "fadeIn 0.3s ease-out" : undefined
              }}
            >
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-2 text-sm ${getColumnClass(colIndex)} font-mono`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Shimmer effect for loading rows */}
      {animate && visibleRows < rows.length && (
        <tr className="border-b border-accent/10 animate-pulse">
          {headers.map((_, i) => (
            <td key={i} className="px-4 py-2 h-8 bg-accent/5" />
          ))}
        </tr>
      )}
    </div>
  )
}

