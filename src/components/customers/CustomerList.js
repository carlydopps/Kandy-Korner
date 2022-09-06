import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(res => res.json())
                .then(customerArray => setCustomers(customerArray))
        },
        []
    )

    return <>
        <h2>List of Customers</h2>

        <article className="customers">
            {
                customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                name={customer.user.name}
                email={customer.user.email} />)   
            }
        </article>
    </>
}