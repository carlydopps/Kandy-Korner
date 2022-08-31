import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    const [productTypes, setProductTypes] = useState([])
    const [product, update] = useState({
        name: "",
        price: "",
        typeId: 0
    })

   const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then(res => res.json())
                .then((productTypeArray) => {
                    setProductTypes(productTypeArray)
                })
        },
        []
    )
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        // TODO: Create the object to be saved to the API
        const productToSendToAPI = {
            name: product.name,
            price: product.price,
            productTypesId: product.productTypesId
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/products")
            })
        }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of the product"
                        value={product.name}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Price of candy"
                        value={product.price}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.price = parseFloat(event.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select onChange={
                            (event) => {
                                const copy = {...product}
                                copy.typeId = parseInt(event.target.value)
                                update(copy)
                            }}>
                        <option value={0}>Select type of candy...</option>
                        {
                            productTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)
                        }
                    </select>
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}