import React from "react";
import Dice from "./Dice";
import Tenzy from "./Tenzy";
import Records from "./Records";
import menu from "../images/menu.svg";
import award from "../images/award.svg";

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
            <i className="menu close">
                <img src={menu} alt="#" onClick={props.changeScreen} />
            </i>
            <h2>{props.screen ? "Tenzies" : "Records"}</h2>
            {props.screen ? (
                <Tenzy
                    award={award}
                    Dices={Dices}
                    tenzies={props.tenzies}
                    rollDices={props.rollDices}
                />
            ) : (
                <Records
                    award={award}
                    restart={props.restart}
                    best={props.best}
                    rolls={props.rolls}
                    tenzies={props.tenzies}
                />
            )}
        </div>
    );
}

export default Tenzies;
