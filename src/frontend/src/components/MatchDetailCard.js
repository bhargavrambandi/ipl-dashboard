import { React } from 'react';
import { Link } from 'react-router-dom';

import "./MatchDetailCard.scss";

export const MatchDetailCard = ({ teamName, match }) => {
    // If there's no match data, return nothing
    if (!match) return null;

    // Determine the other team that played in the match
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;

    // Create a link route to the other team's page
    const otherTeamRoute = `/teams/${otherTeam}`;

    // Check if the current team won the match
    const isMatchWon = teamName === match.matchWinner;

    return (
        // Apply a different class based on whether the current team won or lost
        <div className={isMatchWon ? 'MatchDetailCard won-card' : 'MatchDetailCard lost-card'}>
          <div>
            <span className="vs">vs</span>

            {/* Link to the other team's page */}
            <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>

            {/* Display the match date */}
            <h2 className="match-date">{match.date}</h2>

            {/* Display the match venue */}
            <h3 className="match-venue">at {match.venue}</h3>

            {/* Display the match result */}
            <h3 className="match-result">{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
          </div>
          
          {/* Additional details about the match */}
          <div className="additional-detail">
            <h3>First Innings</h3>
            <p>{match.team1}</p>

            <h3>Second Innings</h3>
            <p>{match.team2}</p>

            <h3>Man of the Match</h3>
            <p>{match.playerOfMatch}</p>

            <h3>Umpires</h3>
            <p>{match.umpire1}, {match.umpire2}</p>
          </div>
        </div>
    );
}
