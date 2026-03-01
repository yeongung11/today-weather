import "./App.css";
import Weather from "./components/MainWeather";

function App() {
    return (
        <div
            className="min-h-screen flex flex-col justify-center bg-linear-to-b from-sky-500 via-sky-600 to-blue-500
"
        >
            <Weather />
        </div>
    );
}

export default App;
