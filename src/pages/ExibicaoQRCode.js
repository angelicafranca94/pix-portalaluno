import React from 'react';
import QRCode from 'qrcode.react';

function ExibicaoQRCode({ qrContent }) {
  return (
    <div className="qr-code-container">
      {qrContent && <QRCode value={qrContent} />}
    </div>
  );
}

export default ExibicaoQRCode;
