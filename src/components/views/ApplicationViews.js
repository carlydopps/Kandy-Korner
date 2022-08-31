import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/ProductList"

export const ApplicationViews = () => {
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
				<Route path="products" element={ <ProductList /> } />
				<Route path="product/create" element={ <ProductForm /> } />
            </Route>
        </Routes>
    )
}

