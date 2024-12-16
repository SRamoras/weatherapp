# WeatherApp

![WeatherApp Screenshot](./screenshot.png)

## Descrição

O **WeatherApp** é uma aplicação web desenvolvida em React que simula um smartphone para exibir informações meteorológicas. Este projeto demonstra a utilização de diversas APIs para fornecer dados em tempo real sobre o clima, localização e informações de países. Devido às restrições das APIs utilizadas, algumas informações são limitadas. Além disso, para garantir o funcionamento correto da localização, é necessário desativar extensões de bloqueio de anúncios (adblockers).

## Funcionalidades

- **Previsão do Tempo Atual**: Exibe as condições meteorológicas atuais para uma cidade específica.
- **Sugestões de Cidades**: Fornece sugestões de cidades conforme o usuário digita.
- **Previsão Estendida**: Mostra a previsão do tempo para os próximos 7 dias, incluindo dados horários.
- **Localização por IP**: Detecta automaticamente a localização do usuário com base no endereço IP.
- **Informações do País**: Exibe informações detalhadas sobre o país da localização atual.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Axios**: Cliente HTTP para realizar requisições às APIs.
- **APIs Utilizadas**:
  - [WeatherAPI](https://www.weatherapi.com/): Fornece dados meteorológicos.
  - [ipinfo.io](https://ipinfo.io/): Obtém informações de localização com base no IP.
  - [REST Countries](https://restcountries.com/): Fornece informações detalhadas sobre países.

## Instalação

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/weatherapp.git
   cd weatherapp
