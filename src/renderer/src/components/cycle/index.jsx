import { useEffect, useState } from "react";

import "./style.scss";

import plus from "../../assets/images/plus.svg";
import minus from "../../assets/images/minus.svg";
import pause from "../../assets/images/pause.svg";
import play from "../../assets/images/play.svg";
import startSFX from "../../assets/sfx/start.mp3";
import endSFX from "../../assets/sfx/end.mp3";

function Cycle() {
    const [periodTime, setPeriodTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [cycles, setCycles] = useState(1);
    const [started, setStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState();
    const [strokeDasharray, setStrokeDasharray] = useState(283);
    const [paused, setPaused] = useState(false);
    const [currentCycle, setCurrentCycle] = useState(1);
    const [isPeriod, setIsPeriod] = useState(true);
    const [isReady, setIsReady] = useState(true);

    const handleClickChangePeriod = (time) => {
        if (periodTime + time === 65 || periodTime + time === 0) return;

        setPeriodTime(periodTime + time);
    };

    const handleClickChangeBreak = (time) => {
        if (breakTime + time === 61 || breakTime + time === 0) return;

        setBreakTime(breakTime + time);
    };

    const handleClickStart = () => {
        setStarted(true);
        setTimeLeft(periodTime * 60);
        setStrokeDasharray(283);
        setPaused(false);
        setIsPeriod(true);
        setCurrentCycle(1);
        setIsReady(true);

        const audio = new Audio(startSFX);
        audio.play();
    };

    const handleClickReady = () => {
        setIsReady(true);
    };

    useEffect(() => {
        if (!started || paused || !isReady) return;

        const interval = setInterval(() => {
            setTimeLeft((value) => value - 1);

            let usedTime = isPeriod ? periodTime : breakTime;
            const t = (timeLeft - 1) / (usedTime * 60);
            setStrokeDasharray(`${(t * 283).toFixed(0)} 283`);

            if (t < 0) {
                if ((cycles === 1 || currentCycle + 1 > cycles) && !isPeriod) {
                    setStarted(false);

                    new window.Notification("Cycle terminé !", { body: "Tous les cycles sont finis." });
                    return;
                } else if (!isPeriod) {
                    setCurrentCycle((value) => value + 1);
                }

                setIsPeriod(!isPeriod);
                setIsReady(false);
                const audio = new Audio(endSFX);
                audio.play();

                if (isPeriod) {
                    new window.Notification("Période finie !", { body: `La période du cycle ${currentCycle} est finie.` });
                } else {
                    new window.Notification("Pause finie !", {
                        body: `La pause du cycle ${currentCycle} est finie. Début du prochain cycle.`,
                    });
                }

                usedTime = !isPeriod ? periodTime : breakTime;
                setTimeLeft(usedTime * 60);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [started, timeLeft, paused, isReady]);

    const handleClickStop = () => {
        setStarted(false);
    };

    const handleClickPause = () => {
        setPaused(!paused);
    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);

        let seconds = timeLeft % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    };

    return (
        <div className="cycle">
            {!started ? (
                <>
                    <div className="field">
                        <span className="name">Période</span>
                        <div className="timer">
                            <div onClick={() => handleClickChangePeriod(5)}>
                                <img src={plus} />
                            </div>
                            <span>{periodTime} min</span>
                            <div onClick={() => handleClickChangePeriod(-5)}>
                                <img src={minus} />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <span className="name">Pause</span>
                        <div className="timer">
                            <div onClick={() => handleClickChangeBreak(1)}>
                                <img src={plus} />
                            </div>
                            <span>{breakTime} min</span>
                            <div onClick={() => handleClickChangeBreak(-1)}>
                                <img src={minus} />
                            </div>
                        </div>
                    </div>
                    <div className="cycles">
                        <b>Cycle</b>
                        <div>
                            <span className={cycles === 1 ? "selected" : ""} onClick={() => setCycles(1)}>
                                x1
                            </span>
                            <span className={cycles === 2 ? "selected" : ""} onClick={() => setCycles(2)}>
                                x2
                            </span>
                            <span className={cycles === 3 ? "selected" : ""} onClick={() => setCycles(3)}>
                                x3
                            </span>
                            <span className={cycles === 4 ? "selected" : ""} onClick={() => setCycles(4)}>
                                x4
                            </span>
                        </div>
                    </div>
                    <div className="actions">
                        <button onClick={handleClickStart}>Commencer</button>
                    </div>
                </>
            ) : (
                <>
                    <span className="name">{isPeriod ? "Période" : "Pause"}</span>
                    <div className="baseTimer">
                        <svg className="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g className="circle">
                                <circle className="path-elapsed" cx="50" cy="50" r="45" />
                                <path
                                    strokeDasharray={strokeDasharray}
                                    className="path-remaining"
                                    d="M 50, 50m -45, 0a 45,45 0 1,0 90,0a 45,45 0 1,0 -90,0"
                                ></path>
                            </g>
                        </svg>
                        {isReady ? (
                            <span className={paused ? "timeRemaining stopped" : "timeRemaining"}>{formatTime()}</span>
                        ) : (
                            <div className="ready">
                                <button onClick={handleClickReady}>Prêt ?</button>
                            </div>
                        )}
                        <span className={paused ? "currentCycle stopped" : "currentCycle"}>
                            Cycle {currentCycle}/{cycles}
                        </span>
                    </div>
                    <div className="actions">
                        <button onClick={handleClickStop}>Arrêter</button>
                        <button onClick={handleClickPause}>
                            <img src={paused ? play : pause} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cycle;
