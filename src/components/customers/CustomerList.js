import { useEffect, useState } from "react"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(res => res.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },
        []
    )

    return <>
        <h2>List of Customers</h2>

        <article className="customers">
            {
                customers.map(
                    (customer) => {
                        return <section className="customer" key={`customer--${customer.id}`}>
                                <header>{customer.user.name}</header>
                                <div>Email: {customer.user.email}</div>
                            </section>
                    }
                )   
            }
        </article>
    </>
}