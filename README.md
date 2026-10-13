# 🌦️ React Weather App

A responsive weather application built with **React, Vite, Material UI, and OpenWeather API**. It displays current weather conditions, temperature, humidity, wind speed, and a 5-day forecast for a searched city.

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Current temperature and feels-like temperature
- 💧 Humidity and wind speed details
- 🌤️ Weather condition icons
- 📅 5-day weather forecast
- 🎨 Responsive UI with glassmorphism styling and animations
- ⚠️ Loading states and error handling

## 🛠️ Tech Stack

- React
- Vite
- Material UI (MUI)
- Framer Motion
- OpenWeather API

## 🚀 Getting Started

**1. Clone the repository**

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure the API key**

Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Get your API key from [OpenWeather](https://openweathermap.org/api).

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 📁 Project Structure

```text
src/
├── components/
│   ├── SearchBox.jsx
│   ├── WeatherDetail.jsx
│   ├── WeatherInfoBox.jsx
│   └── WeatherIntro.jsx
├── pages/
│   └── Weather.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 📌 Note

An active OpenWeather API key is required to fetch weather data. Keep your `.env` file private and do not commit API keys to GitHub.

## 📄 License

This project is for learning and personal development.
