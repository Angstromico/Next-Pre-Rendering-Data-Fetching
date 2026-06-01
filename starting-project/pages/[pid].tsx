import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import path from 'path'
import fs from 'fs/promises'
import Link from 'next/link'
import type { Data, Product } from '../models'

function ProductDetailPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <Link href="/">Back to All Products</Link>
    </>
  )
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath, 'utf-8')
  const data: Data = JSON.parse(jsonData)
  return data
}

export const getStaticProps: GetStaticProps<{
  product: Product
}> = async (context) => {
  const { params } = context
  const productId = params?.pid

  const data = await getData()
  const product = data.products.find((product) => product.id === productId)

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product: product,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData()
  const ids = data.products.map((product) => product.id)
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }))

  return {
    paths: pathsWithParams,
    fallback: false,
  }
}

export default ProductDetailPage