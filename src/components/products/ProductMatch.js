import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Products.css"

export const ProductMatch = ({searchTermState}) => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    // const [quantity, setQuantity] = useState([0])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const navigate = useNavigate()

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
                .then(productArray => setProducts(productArray))
        },
        []
    )

    const handlePurchaseButtonClick = (event, productId) => {

        event.preventDefault()
    
        const purchaseToSendToAPI = {
            customerId: kandyUserObject.id,
            productId: productId,
            quantity: 1,
        }
    
        return fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchaseToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {navigate("/products")})
    }

    return <>
        {
            filteredProducts.map(
                (product) => {
                    return <article key={`product--${product.id}`} value={product.id}>
                        <div className="product">
                            <header>{product.name}</header>
                            <footer>${product.price}</footer>
                            {/* <Link to={`/inventory`}>Show me where</Link> */}
                            {/* <label htmlFor="quantity">Quantity: </label>
                            <input 
                                required autoFocus
                                type="number"
                                className="form-control"
                                placeholder=""
                                value={quantity}
                                onChange ={event => setQuantity(event.target.value)}
                            /> */}
                            <button 
                                onClick={clickEvent => handlePurchaseButtonClick(clickEvent, product.id)}
                            >Purchase</button>
                        </div>
                    </article>
                }
            )
        }
    </>
}