import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import userLogout from "../auth/userLogout";
import { Button } from "@mui/material";

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

function Header({ darkMode, toggleDarkMode }) {
    

	const { error, logOut } = userLogout();

	const auth = getAuth();
	const navigate = useNavigate();

	const handleLogOut = async () => {
		await logOut();

		if (!error) {
			navigate("/");
            console.log('logout component: success logout');
		}
	};
    
	return (
        <div>

		<nav>
            <button className="dark-mode" onClick={toggleDarkMode}>
                {darkMode ? <DarkModeRoundedIcon /> : <WbSunnyRoundedIcon />}
            </button>
			<div>
                <p>Welcome {auth.currentUser.email}! 😃</p>
                <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={handleLogOut}
                >
                    log out
                </Button>
            </div>
            
		</nav>
        </div>
	);
}

export default Header;
