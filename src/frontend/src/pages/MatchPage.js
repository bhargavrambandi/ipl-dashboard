import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss';

export const MatchPage = () => {

    // This state will hold the matches we get from the API
    const [matches, setMatches] = useState([]);
    
    // Get team name and year from the URL
    const { teamName, year } = useParams();

    useEffect(
        () => {
            // Function to fetch matches data from the API
            const fetchMatches = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
                
                // Convert the response to JSON format
                const data = await response.json();
                
                // Save the fetched matches in the state
                setMatches(data);
            };
            
            // Fetch the matches when the component is first loaded or when teamName/year changes
            fetchMatches();
        }, [teamName, year] // The effect runs when teamName or year changes
    );

    return (
        <div className="MatchPage">
            {/* Section where users can select a year */}
            <div className="year-selector">
                <h3> Select Year </h3>
                <YearSelector teamName={teamName} />
            </div>

            {/* Display the matches for the selected team and year */}
            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
                {
                    // Go through each match and display it using MatchDetailCard
                    matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
                }
            </div>
        </div>
    );
}
