import React, { useState, useEffect } from 'react';
import './App.css';
import PageQRCode from './pages/PageQRCode';
import { gerarQRCode } from './services/Api';


function App() {
  const [qrContent, setQRContent] = useState('');
  const [valorDebitos, setValorDebitos] = useState(0);
  const [tempoRestanteSegundos, setTempoExpiracaoSegundos] = useState('');
  const [dtcriacaotransacao, setDtCriacaoTransacao] = useState('');
  const [qtdDebitos, setQtdDebitos] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dados a serem enviados para a API (substitua pelos valores necessários) - preciso receber esse parametros da vue do portal do aluno
        const rm = 350917;
        const codigoDebito = [5052271, 5052298];

        // Chama a API para gerar o QR Code e obter os dados necessários
        const content = await gerarQRCode({ rm, codigoDebito });

        // Atualiza os estados com os dados recebidos da API
        setQRContent(content.pixCopiaECola);
        setValorDebitos(content.original);
        setTempoExpiracaoSegundos(content.expiracao);
        setDtCriacaoTransacao(content.criacao);
        setQtdDebitos(codigoDebito.length);
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
      tempoRestanteSegundos={tempoRestanteSegundos} 
      qtdDebitos = {qtdDebitos}/>
    </div>
  );
}

export default App;
