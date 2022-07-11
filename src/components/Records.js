import React from "react";

function Records(props) {
    function Won() {
        return (
            <div className="you-won">
                <div className="show-win">
                    <img src={props.award} alt="#" />
                    <span>You won!</span>
                    <img src={props.award} alt="#" />
                </div>
                <span className="best-value">{props.rolls} rolls!</span>
            </div>
        );
    }

    return (
        <div>
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

export default Records;
