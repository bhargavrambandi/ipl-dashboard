import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () => {

    // State to store team data, including matches
    const [team, setTeam] = useState({ matches: [] });

    // Get the team name from the URL parameters
    const { teamName } = useParams();

    //useEffect: Fetches team data from the API when the component loads or when the teamName changes.
    useEffect(() => {
        // Function to fetch the team data from the API
        const fetchTeam = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`);
            
            // Convert the response to JSON format
            const data = await response.json();
            
            // Save the fetched team data in the state
            setTeam(data);
        };

        // Call the function to fetch team data
        fetchTeam();

    }, [teamName]); // Run this effect when teamName changes

    // If team data is not found, display a message
    if (!team || !team.teamName) {
        return <h1>Team not found</h1>;
    }

    return (
        <div className="TeamPage">
            {/* Section to display the team name */}
            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>

            {/* Section to display the wins and losses as a pie chart */}
            <div className="win-loss-section">
                Wins / Losses
                <PieChart
                    data={[
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
                        { title: 'Wins', value: team.totalWins, color: '#4da375' },
                    ]}
                />
            </div>

            {/* Section to display the latest match details */}
            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
            </div>

            {/* Display remaining matches as smaller cards */}
            {team.matches.slice(1).map(match => 
                <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />
            )}

            {/* Link to view more matches for the team */}
            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More ></Link>
            </div>
        </div>
    );
}
