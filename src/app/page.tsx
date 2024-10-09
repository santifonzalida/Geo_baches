'use client'
import React, { useState } from 'react';
import { MapProvider } from "./providers/map-provider";
import { MapComponent } from './components/maps';
import { Autocomplete } from '@react-google-maps/api';
import ImageUpload from './components/imageUpload';

export default function Home() {
    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState('');
    const [center, setCenter] = useState({
        lat: -31.382012,
        lng: -64.239547
      });
    const [markerPosition, setMarkerPosition] = useState(center);

    const handlePlaceChanged = () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newCenter = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        };
        setCenter(newCenter); // Actualiza el centro del mapa
        setMarkerPosition(newCenter); // Coloca el marcador en la nueva ubicación
        setAddress(place.formatted_address);
        console.log(center);
        console.log(address);
      } else {
        console.log('No se encontró una dirección válida.');
      }
    };
  
    const handleLoad = (autocompleteInstance) => {
      setAutocomplete(autocompleteInstance);
    };

    const guardarGeoBache = () => {
        console.log(markerPosition);
        console.log(center);
    }


  return (
    <div className="bg-white">
        <MapProvider>
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-12 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-xl overflow-hidden sm:mr-10 p-1 flex relative">
                    <MapComponent 
                      center={center} 
                      markerPosition={markerPosition}
                      setMarkerPosition={setMarkerPosition}/>
                </div>
                <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                    <h2 className="text-gray-900 text-lg mb-1 font-bold title-font">Geobaches</h2>
                    <p className="leading-relaxed mb-5 text-gray-600">Busca en el mapa y postea tu bache</p>
                    <div className="relative mb-4">
                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">1. Dirección</label>
                        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                            <input type="text" id="address" name="address" placeholder='Ingrese una dirección' className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </Autocomplete>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="archivo" className="leading-7 text-sm text-gray-600">2. Seleccionar imagen</label>
                        <ImageUpload />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="message" className="leading-7 text-sm text-gray-600">3. Mensaje o descripción (Opcional)</label>
                        <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                    </div>
                    <button className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={guardarGeoBache}>Guardar</button>
                </div>
            </div>
        </section>
        </MapProvider>
    </div>
  );
}
