import React from "react";
import "./three_players.css";

export default ({ user, players }) => {

    return(
        <div className="three-players-table-container">
            <div className="three-players-table-side-container" style={{justifyContent: "space-between", alignItems: "flex-start"}}>
                <div className="three-players-table-seat-container">

                </div>
                <div className="three-players-table-seat-container">

                </div>
            </div>
            <div className="three-players-table-side-container" style={{justifyContent: "center", alignItems: "flex-end"}}>
                <div className="three-players-table-seat-container">
                    
                </div>
            </div>
        </div>
    );

}