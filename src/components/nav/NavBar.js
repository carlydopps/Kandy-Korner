import { CustomerNav } from "./CustomerNav"
import { EmmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.staff) {
        return <EmmployeeNav/>
    } else {
        return <CustomerNav/>
    }
}

