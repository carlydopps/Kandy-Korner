import { useEffect, useState } from "react"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then(locationArray => setLocations(locationArray))
        },
        [] // When this array is empty, you are observing initial component state
    )


    return <>
        <h2>List of Locations</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        const header = location.address.split(` `).slice(1,).join(' ')
                        return <section className="location" key={`location--${location.id}`}>
                            <h3>{header}</h3>
                            <p>Located at: {location.address}</p>
                            <footer>{location.squareFootage} sq ft</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}
