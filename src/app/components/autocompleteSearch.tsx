'use client'

import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';


const AutocompleteSearch: React.FC = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [address, setAddress] = useState<string>('');

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setAddress('' + place.formatted_address);
        console.log('Dirección seleccionada:', place.formatted_address);
      } else {
        console.log('No se encontró una dirección válida.');
      }
    }
    
  };

  const handleLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  return (
    <div>
      <form>
        <Autocomplete
          onLoad={handleLoad}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Busca una dirección"
            className="input-autocomplete"
          />
        </Autocomplete>
        <button type="submit">Buscar</button>
      </form>
      {address && <p>Dirección seleccionada: {address}</p>}
    </div>
  );
};

export default AutocompleteSearch;
