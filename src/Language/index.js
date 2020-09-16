import React from "react";
import "./index.css";

export default ({ setLanguage, language, hide }) => {

    return(
        <div className="language-button" onClick={() => setLanguage(language === "estonian" ? "english" : "estonian")}>
            {!hide &&
                <p>{language === "estonian" ? "EESTI" : "ENGLISH"}</p>
            }
            <img src={language === "estonian" ? require("../media/svgs/estonia.svg") : require("../media/svgs/uk.svg")} alt="" />
        </div>
    );

}