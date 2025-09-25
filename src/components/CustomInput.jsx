
import React from 'react';

export default function CustomButton ({ email, password, onClick }) {
  const handleClick = () => {
    onClick(email, password);
  };

  return (
    <button onClick={handleClick}     className="bg-green-600 hover:bg-green-700 p-2 rounded text-white font-bold">
      Iniciar Sesión
    </button>
  );
};

