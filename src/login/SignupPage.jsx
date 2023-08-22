import React, { useState } from "react";
import {
	Button,
	FilledInput,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from "@mui/material";

import userSignUp from "../auth/userSignUp";
import { useLocation, useNavigate } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignupPage({ toggleForm }) {
	const navigate = useNavigate();
	const location = useLocation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState({});

	const from = location.state?.from?.pathname || "/home";

	const { error, signUp } = userSignUp();

	const handleSignOut = async (e) => {
		e.preventDefault();
		// setErrorMsg({})

		await signUp(email, password);

		console.log(error);

		if (!error) {
			navigate(from, { replace: true });
			setEmail("");
			setPassword("");

			return;
		} else {
			setErrorMsg({});

			if (error === "Firebase: Error (auth/email-already-in-use).") {
				setErrorMsg({ already_used: "account già in uso" });
				// return
			} else if (
				error ===
				"Firebase: Password should be at least 6 characters (auth/weak-password)."
			) {
				setErrorMsg({
					min_length: "La password deve contenere almeno 6 caratteri",
				});
				console.log(error);
			} else {
				setErrorMsg({ wrong_something: error });
				console.log(error);
			}
		}
	};

	// per input psw
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div className="auth-form-container">
			<h1>Signup to your account</h1>

			<form action="" onSubmit={handleSignOut}>
				<TextField
					sx={{ width: "100%" }}
					label="Email"
					// variant="filled"
					variant="outlined"
					margin="dense"
					id="email"
					value={email}
					// onChange={handleEmailChange}
					error={errorMsg.already_used ? true : false}
					helperText={errorMsg.already_used}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<FormControl
					sx={{ m: 1, width: "100%" }}
					variant="outlined"
					margin="dense"
					error={errorMsg.min_length ? true : false}
				>
					<InputLabel htmlFor="password">Password</InputLabel>
					<OutlinedInput
						id="password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
					<FormHelperText>{errorMsg.min_length}</FormHelperText>
				</FormControl>

				<Button
					variant="contained"
					fullWidth
					type="submit"
					onClick={userSignUp}
				>
					Sign up
				</Button>

				{error && <p>{errorMsg.wrong_something}</p>}

				<p>
					Hai già un account?
					<button onClick={toggleForm} className="btn-link">
						Log in
					</button>
				</p>
				<p className="info">
					Per accedere non riceverai nessuna mail di conferma, puoi usare
					qualsiasi mail anche inesistente per iscriverti nel form signup.
				</p>
			</form>
		</div>
	);
}

export default SignupPage;