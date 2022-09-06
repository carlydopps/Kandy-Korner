import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = () => {

    const [locations, setLocations] = useState([])
    const [employee, update] = useState({
        name: "",
        startDate: "",
        payRate: "",
        userId: 0,
        locationsId: 0,
        email: ""
    })

   const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then(locationsArray => setLocations(locationsArray))
        },
        []
    )
    
    // Post user object first
    // Pass the response to postEmployee() as an argument so you can use the user id for the employee object before posting employee to the API

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const userToSendToAPI = {
            name: employee.name,
            email: employee.email
        }

        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(res => res.json())
            .then(userObj => postEmployee(userObj.id))
        }

    // Post employee object using id from the user object that was posted above
    // Navigate back to /employee route here
    
    const postEmployee = (userId) => {

        const employeeToSendToAPI = {
            startDate: employee.startDate,
            payRate: employee.payRate,
            userId: userId,
            locationsId: employee.locationsId
        }

        return fetch(`http://localhost:8088/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeToSendToAPI)
        })
        .then(() => navigate("/employees"))
        
    }

        

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of the employee"
                        value={employee.name}
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date: </label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="  /  /    "
                        value={employee.startDate}
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.startDate = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay Rate: </label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Enter pay rate"
                        value={employee.payRate}
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.payRate = parseFloat(event.target.value).toLocaleString(`en-US`, {style: 'currency', currency: 'USD'})
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={employee.email}
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.email = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <select onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.locationsId = parseInt(event.target.value)
                                update(copy)
                            }}>
                        <option value={0}>Select location...</option>
                        {
                            locations.map(location => <option key={location.id} value={location.id}>{location.address}</option>)
                        }
                    </select>
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit employee
            </button>
        </form>
    )
}