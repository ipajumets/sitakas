import React from "react";
import "./six_players.css";

export default ({ user, players }) => {

    return(
        <div className="six-players-table-container">
            <div className="six-players-table-fixed-container" style={{justifyContent: "center", alignItems: "flex-start"}}>
                <div className="six-players-table-seat-container">

                </div>
            </div>
            <div className="six-players-table-side-container" style={{justifyContent: "space-between", alignItems: "center"}}>
                <div className="six-players-table-wrapper">
                    <div className="six-players-table-seat-container">

                    </div>
                    <div className="six-players-table-seat-container">

                    </div>
                </div>
                <div className="six-players-table-wrapper">
                    <div className="six-players-table-seat-container">

                    </div>
                    <div className="six-players-table-seat-container">

                    </div>
                </div>
            </div>
            <div className="six-players-table-fixed-container" style={{justifyContent: "center", alignItems: "flex-end"}}>
                <div className="six-players-table-seat-container">
                    
                </div>
            </div>
        </div>
    );

}