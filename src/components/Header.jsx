import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import userLogout from "../auth/userLogout";
import { Button } from "@mui/material";

function Header() {
    
	const { error, logOut } = userLogout();

	const auth = getAuth();
	const navigate = useNavigate();

	const handleLogOut = async () => {
		await logOut();

		if (!error) {
			navigate("/");
		}
	};
    
	return (
		<nav>
			<p>Welcome {auth.currentUser.email}! 😃</p>
			<Button
				variant="outlined"
				size="small"
				color="secondary"
				onClick={handleLogOut}
			>
				log out
			</Button>
		</nav>
	);
}

export default Header;
