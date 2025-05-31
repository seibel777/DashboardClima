# 🌦️ Dashboard de Clima

![React](https://img.shields.io/badge/React-18.0-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-blueviolet?logo=tailwindcss)
![Axios](https://img.shields.io/badge/Axios-HTTP-orange?logo=axios)
![OpenWeather](https://img.shields.io/badge/OpenWeather-API-lightgrey?logo=cloudflare)

> Um painel meteorológico moderno feito com React + Tailwind, que mostra informações climáticas em tempo real usando a API da OpenWeather.

---

## 🖼️ Preview

![preview](https://wqwrtolojbmjvfxevbtj.supabase.co/storage/v1/object/public/picsofprojects//dc.png)

> *Você busca por uma cidade e vê as condições do clima em tempo real de forma clara, rápida e responsiva.*

---

## 🔍 Funcionalidades

- ✅ Busca por cidade (input com verificação)
- ✅ Responsivo para celular e desktop
- ✅ Interface moderna com Tailwind CSS
- ✅ Tratamento de erros (ex: cidade inválida)
- ✅ Feedback visual durante o carregamento
- ✅ Exibe:
  - Temperatura atual 🌡️
  - Sensação térmica
  - Umidade 💧
  - Velocidade do vento 💨
  - Ícone do clima atual ☁️☀️🌧️


---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| [React](https://reactjs.org/) | Estrutura do projeto e reatividade |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização moderna e responsiva |
| [Axios](https://axios-http.com/) | Requisições HTTP para a API |
| [OpenWeather API](https://openweathermap.org/current) | Dados climáticos em tempo real |

---

## 🚀 Como Usar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/dashboard-clima.git
cd dashboard-clima
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure sua chave da OpenWeather

Crie um arquivo `.env` na raiz do projeto com o conteúdo:

```env
OPENWEATHER_API_KEY=sua_chave_aqui
```

> 🔑 Obtenha uma chave gratuita aqui: [https://openweathermap.org/api](https://openweathermap.org/api)

### 4. Inicie a aplicação

```bash
npm run dev
```

Abra no navegador: [http://localhost:5173](http://localhost:5173)

---


## 💡 Melhorias Futuras

* [ ] Modo escuro 🌙
* [ ] Localização automática via GPS
* [ ] Suporte a múltiplos idiomas (i18n)

---

## 🧠 Aprendizados

Esse projeto foi desenvolvido com o objetivo de praticar:

* Consumo de APIs públicas com React
* Organização de código com componentes
* Uso de `useState` e `useEffect`
* Estilização com Tailwind CSS
* Tratamento de erros e UX de carregamento

---

## 📄 Licença

Este projeto está sob a licença MIT.
Feito com 💙 por [João Pedro Seibel](https://github.com/seibel777).


```
