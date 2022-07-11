import React from "react";
import menu from "../images/menu.svg";
import award from "../images/award.svg";

function History(props) {
    function Won() {
        return (
            <div className="you-won">
                <div className="show-win">
                    <img src={award} alt="#" />
                    <span>You won!</span>
                    <img src={award} alt="#" />
                </div>
                <span className="best-value">{props.rolls} rolls!</span>
            </div>
        );
    }

    return (
        <div className="inner-size">
            <i className="menu close">
                <img src={menu} alt="#" onClick={props.changeScreen} />
            </i>

            <h2>Records</h2>

            <div className="melhor-pont">
                <span className="best">Your best: </span>
                <span className="best-value">
                    {props.best === 99999 ? "None" : `${props.best} rolls!`}
                </span>
            </div>
            {props.tenzies ? <Won /> : ""}

            <i className="roll-button" onClick={props.restart}>
                New Game
            </i>
        </div>
    );
}

export default History;
