import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Products.css"

export const ProductMatch = ({searchTermState}) => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])

    useEffect(
        () => {
            let searchProducts = null

            if (searchTermState === "") {
                searchProducts = []
            } else {
                searchProducts = products.filter(product => {
                    return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            }
            setFiltered(searchProducts)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(res => res.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        []
    )

    return <>
        {
            filteredProducts.map(
                (product) => {
                    return <article key={`product--${product.id}`}>
                        <div className="product">
                            <header>{product.name}</header>
                            <footer>${product.price}</footer>
                            {/* <Link to={`/inventory`}>Show me where</Link> */}
                        </div>
                    </article>
                }
            )
        }
    </>
}