import React from "react";
import Dice from "./Dice";

function Tenzies(props) {
    const Dices = [];
    for (let i = 0; i < 10; i++) {
        Dices.push(
            <Dice
                key={i}
                id={i}
                number={props.number[i]}
                handler={props.hold}
            />
        );
    }

    return (
        <div className="out-size">
            <div className="inner-size">
                <h2>Tenzies</h2>
                <p>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
                <div className="dices">{Dices}</div>
                <i className="roll-button" onClick={props.rollDices}>
                    Roll
                </i>
            </div>
        </div>
    );
}

export default Tenzies;
