import { useEffect, useState } from "react"

export const Orders = () => {

    const [orders, setOrders] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=product`)
                .then(res => res.json())
                .then((purchasesArray) => {
                    setOrders(purchasesArray)
                })
        },
        []
    )

    return <>
        <h2>List of Orders</h2>

        <article className="orders">
            {
                orders.map(
                    (order) => {
                        if (order.customerId === kandyUserObject.id) {
                            return <section className="order" key={`order--${order.id}`}>
                                <header>{order.product.name}</header>
                                <footer>${order.product.price}</footer>
                            </section>
                        }
                    }
                )
            }
        </article>
    </>
}