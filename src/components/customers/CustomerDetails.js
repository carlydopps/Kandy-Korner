import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({
        loyaltyNumber: "",
        userId: ""
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then(res => res.json())
            .then((data) => {
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
        },
        [customerId]
    )

    const handleUpdateButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/customers")
            })
    }

    return <>
        <section className="customer">
            <header className="customer__header">{customer?.user?.name}</header>
            <div>Email: {customer?.user?.email}</div>
            <div>
                <label htmlFor="loyaltyNumber">Loyalty Number: </label>
                <input
                    required autoFocus
                    type="text"
                    className="loyalty__update"
                    placeholder={customer.loyaltyNumber}
                    value={customer.loyaltyNumber}
                    onChange={
                        (event) => {
                            const copy = {...customer}
                            copy.loyaltyNumber = parseInt(event.target.value)
                            delete copy.user
                            updateCustomer(copy)
                        }
                    }
                />
                <button
                    onClick ={(clickEvent) => handleUpdateButtonClick(clickEvent)}
                >Update</button>
            </div>
        </section>
    </>
}