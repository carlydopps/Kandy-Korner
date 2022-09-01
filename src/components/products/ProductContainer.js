import { useState } from "react"
import { ProductMatch } from "./ProductMatch"
import { ProductSearch } from "./ProductSearch"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction={setSearchTerms}  />
		<ProductMatch searchTermState={searchTerms}/> 
    </>
}