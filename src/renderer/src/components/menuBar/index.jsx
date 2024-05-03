import { useState } from "react";

import "./style.scss";

import thumbtack from "../../assets/images/thumbtack.svg";
import lock from "../../assets/images/lock.svg";
import lockOpen from "../../assets/images/lock_open.svg";

function MenuBar({ showCycle, setShowCycle }) {
    const [isPinboard, setIsPinboard] = useState(false);
    const [isLock, setIsLock] = useState(false);

    const handleClickPinboard = () => {
        app.pinboard();
        setIsPinboard(!isPinboard);
    };

    const handleClickLock = () => {
        app.lockWindow();
        setIsLock(!isLock);
    };

    return (
        <div className="menuBar">
            <div>
                <button onClick={() => setShowCycle(true)} className={showCycle ? "selected" : ""}>
                    cycle
                </button>
                <button onClick={() => setShowCycle(false)} className={showCycle ? "" : "selected"}>
                    chronomètre
                </button>
            </div>
            <img src={thumbtack} onClick={handleClickPinboard} style={!isPinboard ? { transform: "rotate(45deg)" } : {}} />
            <img src={isLock ? lock : lockOpen} onClick={handleClickLock} />
        </div>
    );
}

export default MenuBar;
