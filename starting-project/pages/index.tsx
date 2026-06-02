import { GetStaticProps, InferGetStaticPropsType } from 'next'
import path from 'path'
import fs from 'fs/promises'
import Link from 'next/link'
import type { Data, Product } from '../models'

// 1. Use GetStaticProps to type the function
export const getStaticProps: GetStaticProps<{
  products: Product[]
}> = async () => {
  const filePatch = path.join(process.cwd(), 'data', 'dummy-backend.json')
  console.log('filePatch', filePatch)
  const jsonData = await fs.readFile(filePatch, 'utf-8')
  const data: Data | undefined = JSON.parse(jsonData)

  return {
    props: {
      products: data.products || [],
    },
    revalidate: 1000,
  }
}

// 2. Use InferGetStaticPropsType to tell the component exactly what it's receiving
export default function Home({
  products = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
    <p><Link href="/user-profile">View Users Profile</Link></p>
    </main>
  )
}
