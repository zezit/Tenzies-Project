import React from "react";
import Confetti from "react-confetti";
import Tenzies from "./components/Tenzies";
import { nanoid } from "nanoid";

function App() {
    const bestScore = () => {
        const number = [];
        record.forEach((element) => {
            number.push(element.rolls);
        });
        let aux = 99999999999;
        number.forEach((element) => {
            if (element < aux) {
                aux = element;
            }
        });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setTenzies(true);
            setRecord((prevRecord) => {
                const newRecord = prevRecord;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row]);

    React.useEffect(() => {
        if (tenzies) {
            const aux = record;
            localStorage.setItem("record", JSON.stringify(aux));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // coloca todos dados no seu estado inicial
    function setNotHold() {
        setRow((prevRow) => {
            const newRow = [];
            for (let i = 0; i < 10; i++) {
                newRow.push({
                    ...prevRow[i],
                    hold: false,
                    // number: 8,
                });
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
        if (!screen && tenzies) restart();
    }

    function restart() {
        setNotHold();
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
            <Tenzies
                screen={screen}
                best={best}
                rolls={manyRolls}
                tenzies={tenzies}
                restart={restart}
                changeScreen={changeScreen}
                rollDices={rollDices}
                dice={row}
                hold={hold}
            />
        </main>
    );
}

export default App;
