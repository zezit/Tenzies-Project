import React from "react";
import Tenzies from "./components/Tenzies";

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

    function restart() {
        setRow(initialArray);
        setTenzies(false);
    }

    return (
        <main className="App">
            <Tenzies
                rollDices={rollDices}
                dice={row}
                hold={hold}
                tenzies={tenzies}
                restart={restart}
            />
        </main>
    );
}

export default App;
