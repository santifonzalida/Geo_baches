'use client'

import React from 'react';
import { GoogleMap, Marker } from "@react-google-maps/api";

export const defaultMapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '15px',
};


const mobileMapContainerStyle = {
    width: '100%',
    height: '100vh', // Tamaño completo de la pantalla para móviles
  };
  

const defaultMapZoom = 14;

const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
};

function MapComponent({ center, markerPosition, setMarkerPosition }) {


    const isMobile = () => {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };

    const handleMarkerDragEnd = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarkerPosition(newPosition);
    };

    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={isMobile() ? mobileMapContainerStyle : defaultMapContainerStyle}
                center={center}
                zoom={defaultMapZoom}
                options={defaultMapOptions}>
                <Marker position={markerPosition} draggable={true} onDragEnd={handleMarkerDragEnd} />
                <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                    <div className="lg:w-1/2 px-6">
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">DETALLES</h2>
                        <p className="mt-1">El bache se posteo correctamente. </p>
                        <p>Gracias por tu aporte!</p>
                    </div>
                    <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">COORDENADAS</h2>
                        <button className="text-red-500 leading-relaxed">-364443,-44526</button>
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">DIRECCIÓN</h2>
                        <p className="leading-relaxed">Calle falsa 1234, la luna.</p>
                    </div>
                </div>
            </GoogleMap>
        </div>
    );
}

export { MapComponent };