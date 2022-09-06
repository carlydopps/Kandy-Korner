import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { Orders } from "../orders/Orders"
import { ProductContainer } from "../products/ProductContainer"
import { ProductLocation } from "../products/ProductLocation"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Your one-stop-shop to get all of your favority candy!</div>

                    <Outlet />
                </>
            }>
				<Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={<ProductContainer />} />
                {/* <Route path="inventory" element={<ProductLocation />} /> */}
                <Route path="orders" element={ <Orders />} />
            </Route>
        </Routes>
    )
}