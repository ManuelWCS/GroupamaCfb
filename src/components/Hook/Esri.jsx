// import React, { useEffect } from 'react';
// import L from 'leaflet';
// import * as ELG from 'esri-leaflet-geocoder';
// import { Map, TileLayer, useMap } from 'react-leaflet';
// import { render } from '@testing-library/react';


// function Esri() {

//     useEffect(() => {
//         const map = useMap();
//         const searchControl = new ELG.Geosearch().addTo(map);
//         const results = new L.LayerGroup().addTo(map);

//         searchControl.on('results', function(data) {
//             results.clearLayers();
//             for (let i = data.results.length -1; i >= 0; i--) {
//                 results.addLayer(L.marker(data.results[i].latlng))
//             }
//         });
//     });
    
//     render() {
//         const center = [37.7833, -122.4167]
//         return (
//             <Map 
//                 style={{height: '800px'}}
//                 center={center} 
//                 zoom="10"
//                 ref={this.mapRef}>
//                 <TileLayer
//                     attribution="&amp;copy Google"
//                     url={'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
//                 <div className='pointer'></div>
//             </Map>
//         );
//     }
// }]
    
//     export default Esri
