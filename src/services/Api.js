import axios from 'axios';

async function gerarQRCode({ data }) {
    try {
      const response = await axios.post('https://localhost:7195/api/pix/QRCodeImediato/v1', {
        data: data
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }

export { gerarQRCode };
