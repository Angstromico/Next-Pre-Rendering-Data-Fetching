import type { Product } from "./interfaces";

function ProductDetailPage({ product }: { product: Product }) {
 return <>
  <h3>{product.title}</h3>
  <p>{product.description}</p>
 </>
}

export default ProductDetailPage;