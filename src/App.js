import React from "react";
import Confetti from "react-confetti";
import Tenzies from "./components/Tenzies";
import History from "./components/History";
import { nanoid } from "nanoid";

function App() {
    const bestScore = () => {
        const number = [];
        record.forEach((element) => {
            number.push(element.rolls);
            console.log("pushing: ", element.rolls);
        });
        console.log("all scores: ", number);
        let aux = 99999999999;
        number.forEach((element) => {
            if (element < aux) {
                aux = element;
            }
        });
        console.log("best score:", aux);
        return aux;
    };

    function initialArray() {
        const initialArray = [];
        for (let i = 0; i < 10; i++) {
            const obj = {
                number: Math.floor(Math.random() * 10),
                hold: false,
                id: i,
            };
            initialArray.push(obj);
        }
        return initialArray;
    }

    const [manyRolls, setRolls] = React.useState(0);
    const [tenzies, setTenzies] = React.useState(false);

    // Player records
    const [record, setRecord] = React.useState(() => {
        return (
            JSON.parse(localStorage.getItem("record")) || [
                {
                    key: nanoid(),
                    rolls: 9999,
                },
            ]
        );
    });

    const [row, setRow] = React.useState(initialArray());
    const [best, setBest] = React.useState(99999);
    const [screen, setScreen] = React.useState(true);

    React.useEffect(() => {
        if (!screen) setBest(bestScore());
    }, [screen]);

    React.useEffect(() => {
        const toCompareNum = row[0].number;
        let won = false;

        for (let i = 0; i < 10; i++) {
            if (row[i].hold === true && row[i].number === toCompareNum) {
                won = true;
            } else {
                won = false;
                break;
            }
        }
        if (won) {
            console.log("won", won);
            setTenzies(true);
            setRecord((prevRecord) => {
                const newRecord = prevRecord;
                console.log(newRecord);
                newRecord.push({
                    key: nanoid(),
                    rolls: manyRolls,
                });
                return newRecord;
            });
            const aux = bestScore();
            setBest(aux);
            setScreen(false);
        }
    }, [row]);

    React.useEffect(() => {
        if (tenzies) {
            const aux = record;
            console.log("saving", aux);
            localStorage.setItem("record", JSON.stringify(aux));
        }
    }, [tenzies]);

    // Roll dices
    function rollDices() {
        setRolls((prev) => prev + 1);
        setRow((prevRow) => {
            const newRow = [];
            for (let i = 0; i < 10; i++) {
                if (!prevRow[i].hold) {
                    newRow.push({
                        ...prevRow[i],
                        number: Math.floor(Math.random() * 10),
                        // number: 8,
                    });
                } else {
                    newRow.push({
                        ...prevRow[i],
                    });
                }
            }
            return newRow;
        });
    }

    // lock dice number
    function hold(dice) {
        const newSet = [];
        if (!tenzies) {
            setRow(() => {
                row.forEach((dado) => {
                    if (dado.id === dice) {
                        newSet.push({
                            ...dado,
                            hold: !dado.hold,
                        });
                    } else {
                        newSet.push({ ...dado });
                    }
                });
                return newSet;
            });
        }
    }

    function changeScreen() {
        setScreen((prev) => !prev);
    }

    function restart() {
        rollDices();
        setRolls(0);
        setTenzies(false);
        setScreen(true);
    }

    return (
        <main className="App">
            {tenzies ? (
                <Confetti style={{ transitionDuration: "250ms" }} />
            ) : (
                ""
            )}
            {screen ? (
                <Tenzies
                    rollDices={rollDices}
                    dice={row}
                    hold={hold}
                    tenzies={tenzies}
                    restart={restart}
                    changeScreen={changeScreen}
                />
            ) : (
                <History
                    best={best}
                    rolls={manyRolls}
                    tenzies={tenzies}
                    restart={restart}
                    changeScreen={changeScreen}
                />
            )}
        </main>
    );
}

export default App;
