// import { useEffect, useState } from "react"
// import useSWR from "swr"
import type { Sale } from "../models"
import { GetStaticProps } from "next"

interface LastSalesProps {
  sales: Sale[]
}

const LastSales = (props: LastSalesProps) => {
  const { sales } = props
  // const apiURL = "https://next-practice-aa0a6-default-rtdb.firebaseio.com/Sales.json"
  // const { data, error } = useSWR<
  //   Record<string, { username: string; volume: number }>
  // >(apiURL, (url) =>
  //   fetch(url).then((res) => res.json())
  // )

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

  // if(error) {
  //   return <div>Failed to load sales data.</div>
  // }

  // if (!data && !sales) {
  //   return <div>Loading...</div>
  // }

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

export const getStaticProps: GetStaticProps = async () => {
  const apiURL = "https://next-practice-aa0a6-default-rtdb.firebaseio.com/Sales.json"
  const response = await fetch(apiURL)
  const data: Record<string, { username: string; volume: number }> = await response.json()

  const transformedSales: Sale[] = Object.entries(data).map(([id, sale]) => ({
    id,
    username: sale.username,
    volume: sale.volume
  }))

  return {
    props: {
      sales: transformedSales
    },
    revalidate: 10
  }
}

export default LastSales