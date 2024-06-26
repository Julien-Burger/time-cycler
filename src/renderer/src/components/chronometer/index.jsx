import { useEffect, useState } from "react";

import "./style.scss";

import pause from "../../assets/images/pause.svg";
import play from "../../assets/images/play.svg";

function Chronometer() {
    const [isStarted, setStarted] = useState(false);
    const [isPaused, setPaused] = useState(false);
    const [timer, setTimer] = useState(0);

    const handleClickStart = () => {
        setStarted(true);
        setTimer(0);
    };

    const handleClickStop = () => {
        setStarted(false);
        setPaused(false);
    };

    const handleClickPause = () => {
        setPaused(!isPaused);
    };

    const handleClickErease = () => {
        setTimer(0);
    };

    useEffect(() => {
        if (!isStarted || isPaused) return;

        const interval = setInterval(() => {
            setTimer((value) => value + 1);
        }, 10);

        return () => {
            clearInterval(interval);
        };
    }, [isStarted, isPaused]);

    const formatTimer = () => {
        const hours = Math.floor(timer / 360000)
            .toString()
            .padStart(2, "0");
        const minutes = Math.floor((timer % 360000) / 6000)
            .toString()
            .padStart(2, "0");
        const seconds = Math.floor((timer % 6000) / 100)
            .toString()
            .padStart(2, "0");
        const milliseconds = (timer % 100).toString().padStart(2, "0");

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    return (
        <div className="chronometer">
            <span className={isPaused ? "chrono stopped" : "chrono"}>{formatTimer()}</span>
            {!isStarted ? (
                <div className="actions">
                    <button onClick={handleClickStart}>Commencer</button>
                    {timer > 0 && <button onClick={handleClickErease}>Effacer</button>}
                </div>
            ) : (
                <div className="actions">
                    <button onClick={handleClickStop}>Arrêter</button>
                    <button onClick={handleClickPause}>
                        <img src={isPaused ? play : pause} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Chronometer;
