'use client'

import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const AutocompleteSearch = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState('');

  const handlePlaceChanged = (event) => {
    const place = autocomplete ? autocomplete?.getPlace() : '';
    if (place.geometry) {
      setAddress(place.formatted_address);
      console.log('Dirección seleccionada:', place.formatted_address);
    } else {
      console.log('No se encontró una dirección válida.');
    }
  };

  const handleLoad = (autocompleteInstance) => {
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
