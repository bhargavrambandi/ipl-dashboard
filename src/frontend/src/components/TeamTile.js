import { React } from 'react';
import { Link } from 'react-router-dom';

import './TeamTile.scss';

export const TeamTile = ({ teamName }) => {

    return (
        // Container for the team tile
        <div className="TeamTile">
            <h1>
                {/* Link to the team's page */}
                <Link to={`/teams/${teamName}`}>
                    {teamName}
                </Link>
            </h1>
        </div>
    );
}
