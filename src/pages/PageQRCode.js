import React, { useEffect, useState } from "react";
import ExibicaoQRCode from "./ExibicaoQRCode";

function PageQRCode({
  qrContent,
  valorDebitos,
  dtcriacaotransacao,
  tempoRestanteSegundos,
  qtdDebitos,
}) {
  const [dataVencimento, setDataVencimento] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const segundos = tempoRestanteSegundos; // 86.400 segundos representam um dia
    const dataAtual = new Date(dtcriacaotransacao);
    dataAtual.setSeconds(dataAtual.getSeconds() + segundos);
    const novaDataVencimento = dataAtual.toLocaleString(); // Formatando a data

    setDataVencimento(novaDataVencimento);
  }, [tempoRestanteSegundos, dtcriacaotransacao]);

  const copyToClipboard = () => {
    if (navigator.clipboard && qrContent) {
      navigator.clipboard
        .writeText(qrContent)
        .then(() => {
          setShowNotification(true);

          setTimeout(() => {
            setShowNotification(false);
          }, 3000); // Notificação desaparecerá após 3 segundos (3000 milissegundos)
        })
        .catch((error) => {
          console.error("Erro ao copiar para a área de transferência:", error);
        });
    }
  };

  return (
    <div className="background-container">
      <div className="white-background">
        <div className="info-text">Enviar R${valorDebitos} para:</div>
        <div className="additional-info">
          Faculdade de Informática e Administração Paulista (FIAP) <br />
          0000.0000/00001
        </div>
        <div className="info-text">Instruções:</div>
        <div className="additional-info">Pagavel até: {dataVencimento}</div>
      </div>
      <div className="gray-background">
        <ExibicaoQRCode qrContent={qrContent} />
        <div className="value-text">
          Valor: R${valorDebitos}
          <br />
        </div>
        <button className="copy-button" onClick={copyToClipboard} id="copyBtn">
          Copiar QR Code
        </button>
        {showNotification && (
          <div className="notification">
            Conteúdo copiado para a área de transferência!
          </div>
        )}
      </div>
    </div>
  );
}

export default PageQRCode;
