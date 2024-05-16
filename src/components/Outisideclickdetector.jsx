import React, { useRef, useEffect } from 'react';

const OutsideClickDetector = ({ onOutsideClick, children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Función para manejar clics fuera del componente
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    // Agregar el evento de clic al documento
    document.addEventListener('click', handleClickOutside);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickDetector;
