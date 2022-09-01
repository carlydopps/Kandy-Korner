import { useEffect, useState } from "react"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=locations&_expand=user`)
                .then(res => res.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )

    return <>
        <h2>List of Employees</h2>

        <article className="employees">
            {
                employees.map(
                    (employee) => {
                        return <section className="employee" key={`employee--${employee.id}`}>
                                <header>{employee.user.name}</header>
                                <div>{employee.locations.address}</div>
                                <div>Email: {employee.user.email}</div>
                            </section>
                    }
                )   
            }
        </article>
    </>
}