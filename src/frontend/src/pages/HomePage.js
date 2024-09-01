import { React, useEffect, useState } from 'react';
import './HomePage.scss';
import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {

    // State to store the list of teams
    const [teams, setTeams] = useState([]);

    // useEffect to fetch the teams data when the component loads
    useEffect(() => {
        // Function to fetch all teams from the API
        const fetchAllTeams = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`);
            
            // Convert the response to JSON format
            const data = await response.json();
            
            // Save the fetched teams data in the state
            setTeams(data);
        };

        // Call the function to fetch teams
        fetchAllTeams();

    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    return (
        <div className="HomePage">
            {/* Header section with the app name */}
            <div className="header-section">
                <h1 className="app-name">IPL Dashboard</h1>
            </div>
            
            {/* Grid layout to display the team tiles */}
            <div className="team-grid">
                { teams.map(team => 
                    <TeamTile key={team.id} teamName={team.teamName} />
                )}
            </div>
        </div>
    );
}
