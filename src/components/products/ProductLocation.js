// import { useEffect, useState } from "react"

// export const ProductLocation = () => {
//     const [inventory, setInventory] = useState({})

//     useEffect(
//         () => {
//             fetch(`http://localhost:8088/inventory`)
//             .then(res => res.json())
//             .then((data) => {
//                 setInventory(data)
//             })
//         },
//         []
//     )

//     return <>
//         <section className="location">
//             <header className="location__header">{location?.user?.fullName}</header>
//             <div>Email: {location?.user?.email}</div>
//             <div>Specialty: {location.specialty}</div>
//             <div>Rate: ${location.rate}</div>
//         </section>
//     </>
// }