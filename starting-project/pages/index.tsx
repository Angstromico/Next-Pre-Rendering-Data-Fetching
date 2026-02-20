import { GetStaticProps, InferGetStaticPropsType } from 'next'
import path from 'path'
import fs from 'fs/promises'
import { title } from 'process'

// 1. Define the internal data structure
type Product = {
  id: string
  title: string
  description: string
}

interface Data {
  products: Product[]
}

// 2. Use GetStaticProps to type the function
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
  }
}

// 3. Use InferGetStaticPropsType to tell the component exactly what it's receiving
export default function Home({
  products = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </li>
      ))}
    </ul>
  )
}
