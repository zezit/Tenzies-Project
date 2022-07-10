import React from "react";
import Confetti from "react-confetti";
import Tenzies from "./components/Tenzies";
import History from "./components/History";

function App() {
    const initialArray = [];
    for (let i = 0; i < 10; i++) {
        const obj = {
            number: i,
            hold: false,
            id: i,
        };
        initialArray.push(obj);
    }

    const [tenzies, setTenzies] = React.useState(false);
    const [row, setRow] = React.useState(initialArray);
    const [screen, setScreen] = React.useState(true);

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
        }
    }, [row]);

    // Roll dices
    function rollDices() {
        setRow((prevRow) => {
            const newRow = [];
            for (let i = 0; i < 10; i++) {
                if (!prevRow[i].hold) {
                    newRow.push({
                        ...prevRow[i],
                        number: Math.floor(Math.random() * 10),
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
        setRow(initialArray);
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
                    tenzies={tenzies}
                    restart={restart}
                    changeScreen={changeScreen}
                />
            )}
        </main>
    );
}

export default App;
