import { useState } from "react";

import MenuBar from "../components/menuBar";
import Cycle from "../components/cycle";
import Chronometer from "../components/chronometer";

function App() {
    const [showCycle, setShowCycle] = useState(true);

    return (
        <>
            <MenuBar showCycle={showCycle} setShowCycle={setShowCycle} />
            {showCycle ? <Cycle /> : <Chronometer />}
        </>
    );
}

export default App;
