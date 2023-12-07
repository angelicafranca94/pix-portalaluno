import React, { useState, useEffect } from 'react';
import './styles/App.css';
import PageQRCode from './pages/PageQRCode';
import { gerarQRCode } from './services/Api';



function App() {
  const [qrContent, setQRContent] = useState('');
  const [valorDebitos, setValorDebitos] = useState(0);
  const [tempoRestanteSegundos, setTempoExpiracaoSegundos] = useState('');
  const [dtcriacaotransacao, setDtCriacaoTransacao] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
       
         const urlParams = new URLSearchParams(window.location.search);
         const data = urlParams.get('data');

        const content = await gerarQRCode({ data });

      
        setQRContent(content.pixCopiaECola);
        setValorDebitos(content.original);
        setTempoExpiracaoSegundos(content.expiracao);
        setDtCriacaoTransacao(content.criacao);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* Renderiza os componentes com os dados obtidos da API */}
      <PageQRCode qrContent={qrContent} 
      valorDebitos={valorDebitos} 
      dtcriacaotransacao = {dtcriacaotransacao} 
      tempoRestanteSegundos={tempoRestanteSegundos}/>
    </div>
  );
}

export default App;
