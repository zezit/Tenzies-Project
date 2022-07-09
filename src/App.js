import React from "react";
import Tenzies from "./components/Tenzies";

function App() {
    const [row, setRow] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    function rollDices() {
        setRow(() => {
            const newRow = [];
            for (let i = 0; i < 10; i++) {
                newRow.push(Math.floor(Math.random() * 10));
            }
            return newRow;
        });
    }

    function hold(dice) {
      
    }

    return (
        <main className="App">
            <Tenzies rollDices={rollDices} number={row} hold={hold} />
        </main>
    );
}

export default App;
