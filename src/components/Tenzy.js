import React from "react";

function Tenzy(props) {
    return (
        <div>
            <p>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dices">{props.Dices}</div>
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

export default Tenzy;
