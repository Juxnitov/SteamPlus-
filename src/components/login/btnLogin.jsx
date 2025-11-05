import React from 'react';


export default function BtnLogin({ mensaje, onClick }) {
    return (
        <button 
            onClick={onClick} 
            className="bg-purple-600 hover:bg-purple-700 p-2 rounded max-w-[300px] text-white font-bold mt-4" 
            style={{ minWidth: 0, width: "100%" }}
            
        >
            {mensaje}
        </button>
    );
}