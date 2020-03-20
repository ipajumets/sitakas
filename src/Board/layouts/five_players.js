import React from "react";
import "./five_players.css";

export default ({ user, players }) => {

    return(
        <div className="five-players-table-container">
            <div className="five-players-table-side-container" style={{justifyContent: "space-around", alignItems: "flex-start"}}>
                <div className="five-players-table-seat-container">

                </div>
                <div className="five-players-table-seat-container">

                </div>
            </div>
            <div className="five-players-table-side-container" style={{justifyContent: "space-between", alignItems: "center"}}>
                <div className="five-players-table-seat-container">

                </div>
                <div className="five-players-table-seat-container">

                </div>
            </div>
            <div className="five-players-table-side-container" style={{justifyContent: "center", alignItems: "flex-end"}}>
                <div className="five-players-table-seat-container">
                    
                </div>
            </div>
        </div>
    );

}