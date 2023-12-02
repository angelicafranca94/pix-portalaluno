import axios from 'axios';

async function gerarQRCode({ rm, codigoDebito }) {
    try {
      const response = await axios.post('https://localhost:7195/api/pix/QRCodeImediato/v1', {
        rm,
        codigoDebito
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }

export { gerarQRCode };
