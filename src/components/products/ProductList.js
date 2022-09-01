import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

export const ProductList = ({searchTermState}) => {
    const [products, setProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [expensiveOnly, updateExpensiveOnly] = useState(false)

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            const searchProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchProducts)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_expand=productTypes`)
                .then(res => res.json())
                .then((productArray) => {
                    setProducts(productArray)
                })

            fetch(`http://localhost:8088/productTypes`)
            .then(res => res.json())
            .then((productTypeArray) => {
                setProductTypes(productTypeArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            setFiltered(products)
        },
        [products]
    )

    useEffect(
        () => {
            if (expensiveOnly) {
                const expensiveProducts = products.filter(product => product.price > 2)
                setFiltered(expensiveProducts)
            } else {
                setFiltered(products)
            }
        },
        [expensiveOnly]
    )

    return <>  
        <>
            <button onClick={() => {updateExpensiveOnly(true)}}>Top Priced</button> 
            <button onClick={() => {updateExpensiveOnly(false)}}>Show All</button> 
            <button onClick={() => navigate("/product/create")}>Create Product</button>
        </>
    
        <h2>List of products</h2>

        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <header>{product.name}</header>
                            <ul>
                                <li>{product.price.toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})}</li>
                                <li>{product.productTypes.name}</li>
                            </ul>
                        </section>
                    }
                )
            }
        </article>
    </>
}