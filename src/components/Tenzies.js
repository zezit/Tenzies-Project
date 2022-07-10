import React from "react";
import Dice from "./Dice";
import menu from "../images/menu.svg";

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
            <i className="menu">
                <img src={menu} alt="#" onClick={props.changeScreen} />
            </i>
            <h2>Tenzies</h2>
            <p>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dices">{Dices}</div>
            {!props.tenzies ? (
                <i className="roll-button" onClick={props.rollDices}>
                    Roll
                </i>
            ) : (
                ""
            )}
        </div>
    );
}

export default Tenzies;
