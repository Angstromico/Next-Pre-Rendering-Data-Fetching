'use client'
//import { useEffect, useState } from "react"
import useSWR from "swr"
//import type  { Sale } from "../models"

const LastSales = () => {
  const apiURL = "https://next-practice-aa0a6-default-rtdb.firebaseio.com/Sales.json"
  const { data, error } = useSWR<
  Record<string, { username: string; volume: number }>
>(apiURL, (url) =>
  fetch(url).then((res) => res.json())
)

  // const [sales, setSales] = useState<Sale[]>([])
  // const [loading, setLoading] = useState(true)
  
  // useEffect(() => {
  //   const fetchSales = async () => {
  //     try {
  //       const response = await fetch(apiURL)
  //       const data: Record<string, { username: string; volume: number }> = await response.json()

  //       const transformedSales: Sale[] = Object.entries(data).map(([id, sale]) => ({
  //         id,
  //         username: sale.username,
  //         volume: sale.volume
  //       }))

  //       setSales(transformedSales)
  //       setLoading(false)
  //     } catch (error) {
  //       console.error("Error fetching sales data:", error)
  //       setLoading(false)
  //     }
  //   }

  //   fetchSales()
  // }, [])

  if(error) {
    return <div>Failed to load sales data.</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <h2>Last Sales</h2>
      <ul>
        {data && Object.entries(data).map(([id, sale]) => (
          <li key={id}>
            <p>{sale.username}</p>
            <p>{sale.volume}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LastSales