import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ url }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <QRCode 
        value={url} 
        size={100} // Taille du QR code (peut être ajustée)
        level="H" // Niveau de correction d'erreur (L, M, Q, H)
        includeMargin={true} // Inclure une marge autour du QR code
      />
    </div>
  );
};

export default QRCodeGenerator;
