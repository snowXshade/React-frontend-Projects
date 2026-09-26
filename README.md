# 🌤️ Weather App

A responsive weather application built with **React**, **Material UI**, and **Framer Motion**. Users can search for a city and retrieve its current weather information using the **OpenWeather API**.

The project demonstrates frontend API integration, React state management, asynchronous JavaScript, environment variables, loading/error states, responsive UI design, and UI animations.

---

## Features

* 🔎 Search weather by city name
* 🌡️ Display current temperature
* 🌡️ Display "feels like" temperature
* 💧 Display humidity
* 🌬️ Display wind speed
* 🌍 Display city and country
* ☁️ Display current weather condition
* ⏳ Loading indicator while fetching data
* ❌ Error handling for invalid cities and API errors
* ⌨️ Search using the Enter key
* 📱 Responsive layout
* 🎨 Material UI components
* ✨ Framer Motion animations
* 🎬 Animated weather-app intro screen

---

## Technologies Used

| Technology        | Purpose                                |
| ----------------- | -------------------------------------- |
| React             | Frontend UI and state management       |
| Vite              | Development environment and build tool |
| Material UI (MUI) | UI components and responsive styling   |
| Framer Motion     | UI animations                          |
| OpenWeather API   | Weather data                           |
| Fetch API         | HTTP requests                          |
| JavaScript        | Application logic                      |

---

## Project Structure

```text
weather-app/
│
├── src/
│   ├── Pages/
│   │   └── Weather.jsx
│   │
│   ├── compo/
│   │   ├── WeatherIntro.jsx
│   │   └── WeatherIntro.css
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project

```bash
cd weather-app
```

### 3. Install dependencies

```bash
npm install
```

If the required packages are not already installed:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material framer-motion
```

---

## OpenWeather API Setup

This application uses the OpenWeather current-weather API.

The API endpoint used is:

```text
https://api.openweathermap.org/data/2.5/weather
```

The request requires:

```text
q       → City name
appid   → OpenWeather API key
units   → Temperature unit
```

Example:

```text
https://api.openweathermap.org/data/2.5/weather?q=Ranchi&appid=YOUR_API_KEY&units=metric
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

The application accesses the key using:

```js
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

### `.env` location

The `.env` file should be beside `package.json`:

```text
weather-app/
├── .env
├── package.json
└── src/
```

It should **not** be inside `src/`.

---

## Running the Application

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL, usually similar to:

```text
http://localhost:5173
```

---

## How the Application Works

The application follows this flow:

```text
User enters city
       ↓
React stores city in state
       ↓
User clicks Search / presses Enter
       ↓
Weather API request is created
       ↓
OpenWeather API
       ↓
JSON weather response
       ↓
Response is converted into application data
       ↓
React stores weather data
       ↓
MUI displays weather information
       ↓
Framer Motion animates the result
```

---

## API Request

The request is constructed dynamically using the city entered by the user:

```js
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
  city
)}&appid=${API_KEY}&units=metric`;
```

`encodeURIComponent()` makes the city name safe for use inside a URL.

For example:

```text
New Delhi
```

becomes:

```text
New%20Delhi
```

---

## API Response Processing

OpenWeather returns its own JSON structure.

For example:

```json
{
  "name": "Ranchi",
  "sys": {
    "country": "IN"
  },
  "main": {
    "temp": 28.5,
    "feels_like": 29.1,
    "humidity": 65
  },
  "weather": [
    {
      "description": "scattered clouds"
    }
  ],
  "wind": {
    "speed": 3.5
  }
}
```

The application converts this response into a simpler structure:

```js
const weatherData = {
  city: data.name,
  country: data.sys.country,
  temperature: Math.round(data.main.temp),
  condition: data.weather[0].description,
  feelsLike: Math.round(data.main.feels_like),
  humidity: data.main.humidity,
  wind: data.wind.speed,
};
```

This allows the UI to use simple properties:

```js
weather.city
weather.country
weather.temperature
weather.condition
weather.feelsLike
weather.humidity
weather.wind
```

---

## React State

The application uses `useState()` to manage four main pieces of state:

```js
const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

### City

Stores the user's search input.

### Weather

Stores the processed weather data returned from the API.

### Loading

Controls the loading indicator while the API request is running.

### Error

Stores error messages that are displayed to the user.

---

## Loading State

While the API request is running:

```js
setLoading(true);
```

The application displays:

```text
Fetching weather...
```

After the request finishes:

```js
setLoading(false);
```

---

## Error Handling

The application handles several API errors.

### Empty input

```text
Please enter a city name.
```

### City not found

HTTP `404`:

```text
City not found.
```

### Invalid API key

HTTP `401`:

```text
Invalid API key.
```

### Other API errors

```text
Unable to fetch weather data.
```

---

## Material UI

The application uses Material UI components including:

```js
Box
Button
Card
CardContent
CircularProgress
Container
Divider
Paper
Stack
TextField
Typography
```

Material UI icons are used for:

```js
SearchIcon
LocationOnIcon
WaterDropIcon
AirIcon
DeviceThermostatIcon
```

The UI uses MUI's responsive styling system:

```js
sx={{
  fontSize: {
    xs: "2.3rem",
    md: "3.5rem",
  },
}}
```

This allows the interface to adapt to different screen sizes.

---

## Framer Motion

Framer Motion is used to animate:

* Page heading
* Search section
* Weather result card
* Temperature
* Intro transition

Example:

```jsx
<motion.div
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

This creates an entrance animation when the component renders.

---

## Weather Intro

The application includes a separate intro component:

```text
src/compo/WeatherIntro.jsx
```

The intro is controlled using:

```js
const [showIntro, setShowIntro] = useState(true);
```

After the intro animation completes:

```js
onComplete={() => setShowIntro(false)}
```

the main weather interface becomes visible.

---

## Current API Limitation

The current implementation uses OpenWeather's **current weather endpoint**:

```text
/data/2.5/weather
```

Therefore, this version displays **current weather only**.

It does not currently provide a 5-day forecast.

A forecast feature would require a separate forecast endpoint and additional response processing.

---

## API Key Security

The API key is stored in:

```text
.env
```

rather than directly inside the React source code.

However, because this is a Vite frontend application, a variable beginning with:

```text
VITE_
```

is ultimately exposed to the browser.

Therefore, this method protects the key from accidentally being committed directly into the source code, but **it does not make the API key secret**.

For a production application, the recommended architecture is:

```text
React Frontend
       ↓
Your Backend API
       ↓
OpenWeather API
       ↓
Your Backend
       ↓
React Frontend
```

The backend can store:

```env
OPENWEATHER_API_KEY=your_secret_key
```

without the `VITE_` prefix.

---

## Future Improvements

* [ ] Move OpenWeather requests to an Express backend
* [ ] Hide the OpenWeather API key on the server
* [ ] Add API request counting
* [ ] Add API rate limiting
* [ ] Add 5-day forecast
* [ ] Add weather icons based on conditions
* [ ] Add current-location weather
* [ ] Add geocoding support
* [ ] Add city autocomplete
* [ ] Add Celsius/Fahrenheit conversion
* [ ] Add weather caching
* [ ] Add more detailed weather information
* [ ] Deploy frontend and backend
* [ ] Add production error handling

---

## Learning Objectives

This project demonstrates practical use of:

* React components
* React `useState`
* Event handling
* Controlled inputs
* Async/await
* Fetch API
* REST API integration
* JSON response handling
* Environment variables
* HTTP status codes
* Error handling
* Material UI
* Responsive design
* Framer Motion
* Component reuse

---

## License

This project is intended for learning and educational purposes.