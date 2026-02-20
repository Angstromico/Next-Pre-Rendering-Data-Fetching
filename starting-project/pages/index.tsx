import { GetStaticProps, InferGetStaticPropsType } from 'next'

// 1. Define the internal data structure
type Product = {
  id: number
  name: string
}

// 2. Use GetStaticProps to type the function
export const getStaticProps: GetStaticProps<{
  products: Product[]
}> = async () => {
  const products: Product[] = [{ id: 1, name: 'Product 1' }]

  return {
    props: {
      products,
    },
  }
}

// 3. Use InferGetStaticPropsType to tell the component exactly what it's receiving
export default function Home({
  products = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {products.map(
        (
          product, //Cannot read properties of undefined (reading 'map')
        ) => (
          <li key={product.id}>{product.name}</li>
        ),
      )}
    </ul>
  )
}
