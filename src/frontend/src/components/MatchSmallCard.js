import React from 'react';
import { Link } from 'react-router-dom';
import './MatchSmallCard.scss';

export const MatchSmallCard = ({ match, teamName }) => {
    // Return null if there's no match data
    if (!match) return null;

    // Determine the other team that played in the match
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;

    // Check if the current team won the match
    const isMatchWon = teamName === match.matchWinner;

    return (
        // Apply a different class based on whether the current team won or lost
        <div className={`MatchSmallCard ${isMatchWon ? 'won-card' : 'lost-card'}`}>
            <span className="vs">vs</span>

            {/* Link to the other team's page */}
            <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>

            {/* Display the match result */}
            <p className="match-result">
                {match.matchWinner} won by {match.resultMargin} {match.result}
            </p>
        </div>
    );
};
