import { useState } from "react";

import thumbtack from "../assets/images/thumbtack.svg";
import Cycle from "../components/cycle";
import Chronometer from "../components/chronometer";

function App() {
    const [isPinboard, setIsPinboard] = useState(false);
    const [showCycle, setShowCycle] = useState(true);

    const handleClickPinboard = () => {
        app.pinboard();
        setIsPinboard(!isPinboard);
    };

    return (
        <>
            <header>
                <div>
                    <button onClick={() => setShowCycle(true)} className={showCycle ? "selected" : ""}>
                        cycle
                    </button>
                    <button onClick={() => setShowCycle(false)} className={showCycle ? "" : "selected"}>
                        chronomètre
                    </button>
                </div>
                <img src={thumbtack} onClick={handleClickPinboard} style={!isPinboard ? { transform: "rotate(45deg)" } : {}} />
            </header>
            {showCycle ? <Cycle /> : <Chronometer />}
        </>
    );
}

export default App;
