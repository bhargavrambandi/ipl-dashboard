import { React } from 'react';
import { Link } from 'react-router-dom';

import './YearSelector.scss';

export const YearSelector = ({ teamName }) => {
    
    // Create an empty array to hold the years
    let years = [];
    
    // Get the start year and end year from environment variables
    const startYear = process.env.REACT_APP_DATA_START_YEAR;
    const endYear = process.env.REACT_APP_DATA_END_YEAR;

    // Loop through each year from startYear to endYear and add it to the years array
    for (let i = startYear; i <= endYear; i++) {
        years.push(i);
    }

    return (
        // Create an ordered list to display the years
        <ol className="YearSelector">
            {/* Loop through the years array and create a list item for each year */}
            { years.map(year => (
                <li key={year}>
                    {/* Link to the matches page for the team and year */}
                    <Link to={`/teams/${teamName}/matches/${year}`}>{year}</Link>
                </li>
            )) }
        </ol>
    );
}
