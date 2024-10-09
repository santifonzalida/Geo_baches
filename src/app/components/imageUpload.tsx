'use client'

import React, { useState } from 'react';
import Image from 'next/image'


const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para validar el tamaño del archivo (máximo 3 MB)
  const validateFileSize = (file) => {
    const maxSizeInBytes = 3 * 1024 * 1024; // 3 MB
    return file.size <= maxSizeInBytes;
  };

  // Función para convertir el archivo a base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Función para manejar la subida del archivo
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Validar tipo de archivo
    const fileType = file.type;
    if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
      setErrorMessage('Solo se permiten archivos PNG o JPG');
      return;
    }

    // Validar tamaño del archivo
    if (!validateFileSize(file)) {
      setErrorMessage('El archivo no debe superar los 3 MB');
      return;
    }

    setErrorMessage(''); // Limpiar errores anteriores
    setSelectedImage(file);

    try {
      const base64 = await convertToBase64(file);
      setBase64Image(base64);
      console.log('Imagen en base64:', base64); // Aquí puedes enviar la imagen al backend o guardarla en la base de datos
    } catch (error) {
      console.error('Error al convertir a base64:', error);
    }
  };

  return (
    <div>
      <input
        className='class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {selectedImage && (
        <div>
          <p>Imagen seleccionada: {selectedImage.name}</p>
          <p>Tamaño: {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB</p>
          <Image
            src={base64Image}
            width={200}
            height={300}
            alt="Vista previa"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
