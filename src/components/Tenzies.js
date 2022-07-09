import React from "react";
import Dice from "./Dice";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from "react-confetti";

function Tenzies(props) {
    function handler(diceId) {
        props.hold(diceId);
    }

    const Dices = [];
    for (let i = 0; i < 10; i++) {
        Dices.push(
            <Dice
                key={i}
                id={props.dice[i].id}
                number={props.dice[i].number}
                handler={handler}
                hold={props.dice[i].hold}
            />
        );
    }

    return (
        <div className="inner-size">
            {props.tenzies ? <Confetti style={{transitionDuration: "250ms"}}/> : ""}
            <h2>Tenzies</h2>
            <p>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dices">{Dices}</div>
            <i
                className="roll-button"
                onClick={props.tenzies ? props.restart : props.rollDices}
            >
                {props.tenzies ? "New Game" : "Roll"}
            </i>
        </div>
    );
}

export default Tenzies;
