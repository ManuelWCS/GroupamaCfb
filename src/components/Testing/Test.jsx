
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from "react";
import './Test.css';


const SomeComponent = () => {  

    const [initialPosition, setInitialPosition] = useState()
    const [selectedPosition, setSelectedPosition] = useState()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);

        });
    }, []);



    const Markers = () => {

        const map = useMapEvents({
            click(e) {                                
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);                
            },            
        })

        return (
            selectedPosition ? 
                <Marker           
                key={selectedPosition[0]}
                position={selectedPosition}
                interactive={false} 
                />
            : null
        )   
        
    }



    return(
        <MapContainer className="map3"
            center={[47.830261, 1.93609]} 
            zoom={12}                        
        >
            <Markers />
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />                        
        </MapContainer>
    )
}

export default SomeComponent;