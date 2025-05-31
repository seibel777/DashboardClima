# 🌦️ Dashboard de Clima

![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=nextdotjs)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-blueviolet?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![OpenWeather](https://img.shields.io/badge/OpenWeather-API-lightgrey?logo=cloudflare)

> Um painel meteorológico moderno construído com **Next.js + Tailwind CSS**, que exibe dados climáticos em tempo real usando a **API da OpenWeather**.

---

## 🖼️ Preview

![preview](https://wqwrtolojbmjvfxevbtj.supabase.co/storage/v1/object/public/picsofprojects//dc.png)

> *Busque uma cidade e visualize as condições climáticas atuais de forma clara, rápida e responsiva.*

---

## 🔍 Funcionalidades

* ✅ Busca por cidade (input com verificação)
* ✅ Responsivo para dispositivos móveis e desktop
* ✅ Interface moderna com Tailwind CSS
* ✅ Tratamento de erros (ex: cidade não encontrada)
* ✅ Feedback visual durante o carregamento
* ✅ Exibe:

  * Temperatura atual 🌡️
  * Sensação térmica
  * Umidade 💧
  * Velocidade do vento 💨
  * Ícone do clima atual ☁️☀️🌧️

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia                                            | Finalidade                       |
| ----------------------------------------------------- | -------------------------------- |
| [Next.js](https://nextjs.org/)                        | Estrutura do projeto com SSR/CSR |
| [Tailwind CSS](https://tailwindcss.com/)              | Estilização moderna e responsiva |
| [Vercel](https://vercel.com/)                         | Deploy rápido e fácil do projeto |
| [OpenWeather API](https://openweathermap.org/current) | Dados climáticos em tempo real   |

---

## 🚀 Como Usar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/dashboard-clima.git
cd dashboard-clima
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure sua chave da OpenWeather

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
OPENWEATHER_API_KEY=sua_chave_aqui
```

> 🔑 Obtenha uma chave gratuita aqui: [https://openweathermap.org/api](https://openweathermap.org/api)

### 4. Inicie a aplicação

```bash
npm run dev
```

Abra no navegador: [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy com Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Defina a variável de ambiente `OPENWEATHER_API_KEY`
4. Clique em **Deploy**

---

## 💡 Melhorias Futuras

* [ ] Modo escuro 🌙
* [ ] Localização automática via GPS
* [ ] Suporte a múltiplos idiomas (i18n)

---

## 🧠 Aprendizados

Esse projeto foi desenvolvido com o objetivo de praticar:

* Consumo de APIs públicas com Next.js
* Organização de código com componentes
* Uso de `useState` e `useEffect`
* Estilização com Tailwind CSS
* Tratamento de erros e experiência do usuário

---

## 📄 Licença

Este projeto está sob a licença MIT.
Feito com 💙 por [João Pedro Seibel](https://github.com/seibel777)

---
