import "./App.css";
import Weather from "./components/weather";
import Practice from "./components/Practice";

function App() {
    return (
        <div className="min-h-screen flex flex-col justify-center bg-linear-to-b from-slate-950 via-blue-750 to-sky-950">
            <Weather />
            {/* <Practice /> */}
        </div>
    );
}

export default App;
