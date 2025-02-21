import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Fridge from "./pages/Fridge";

function App() {
    return (
        <main className="">
            <Router>
                <Routes>
                    <Route path="/" element={<Fridge />} />
                </Routes>
            </Router>
        </main>
    );
}

export default App;
