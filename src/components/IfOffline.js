import React, { useState, useEffect } from 'react';

export default function IfOffline({ children }) {
  const [onLine, setOnLine] = useState(navigator ? navigator.onLine : true);

  useEffect(() => {
    if (!window) return;
    window.addEventListener('online', goOnLine);
    window.addEventListener('online', goOffLine);

    return () => {
      window.removeEventListener('online', goOnLine);
      window.removeEventListener('online', goOffLine);
    };
  });

  const goOnLine = () => {
    setOnLine(true);
  };
  const goOffLine = () => {
    setOnLine(false);
  };

  if (onLine) {
    return null;
  }

  return <span>{children}</span>;
}
