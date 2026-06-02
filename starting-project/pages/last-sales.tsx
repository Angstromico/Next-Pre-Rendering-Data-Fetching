'use client'
import { useEffect, useState } from "react"
import type  { Sale } from "../models"

const LastSales = () => {
  const apiURL = "https://next-practice-aa0a6-default-rtdb.firebaseio.com/Sales.json"
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(apiURL)
        const data: Record<string, { username: string; volume: number }> = await response.json()

        const transformedSales: Sale[] = Object.entries(data).map(([id, sale]) => ({
          id,
          username: sale.username,
          volume: sale.volume
        }))

        setSales(transformedSales)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching sales data:", error)
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <h2>Last Sales</h2>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            <p>{sale.username}</p>
            <p>{sale.volume}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LastSales