import React from "react";
import "./index.css";

export default ({ hide, title }) => {

    return(
        <a href="https://www.buymeacoffee.com/sitarataseu" target="_blank" rel="noopener noreferrer" className="buy-me-a-coffee-button">
            <img src={require("../media/svgs/coffee.svg")} alt="" />
            {!hide &&
                <p>{title}</p>
            }
        </a>
    );

}