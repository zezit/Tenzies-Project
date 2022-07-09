import React from "react";

function Dice(props) {
    return (
        <div
            className={`dado ${props.hold ? "dont-change" : "change"}`}
            id={`#${props.id}`}
            onClick={() => props.handler(props.id)}
        >
            {props.number}
        </div>
    );
}

export default Dice;
