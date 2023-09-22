import React, { useState } from "react";
import {
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import userSignUp from "../auth/userSignUp";
import { useNavigate } from "react-router-dom";


function SignupPage({ toggleForm }) {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState({});

	const { error, signUp } = userSignUp();

	const handleSignOut = async (e) => {
		e.preventDefault();

		await signUp(email, password);

		if (!error) {
			navigate("/home", { replace: true });
			setEmail("");
			setPassword("");
			return;

		} else {
			setErrorMsg({});

			if (error === "Firebase: Error (auth/email-already-in-use).") {
				setErrorMsg({ already_used: "This email is already registered" });
			} else if (error === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
				setErrorMsg({
					min_length: "Password must be 6 or more characters.",
				});
			} else {
				setErrorMsg({ wrong_something: error });
			}
		}
	};

	// per input psw
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div className="auth-form-container">
			<h1>Create your account</h1>

			<form action="" onSubmit={handleSignOut}>
				<TextField
					fullWidth
					label="Email"
					variant="outlined"
					margin="dense"
					id="email"
					value={email}
					error={errorMsg.already_used ? true : false}
					helperText={errorMsg.already_used}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<FormControl
					fullWidth
					variant="outlined"
					margin="dense"
					error={errorMsg.min_length ? true : false}
				>
					<InputLabel htmlFor="password">Password</InputLabel>
					<OutlinedInput
						id="password"
                        autoComplete="off"
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
                    color="secondary"
					variant="contained"
					fullWidth
					type="submit"
					onClick={userSignUp}
				>
					Sign up
				</Button>

				{error && <p>{errorMsg.wrong_something}</p>}

				<p>
					Already have an account?
					<button onClick={toggleForm} className="btn-link">
						Log in
					</button>
				</p>
				<p className="info">
                    To access, you won't receive any confirmation email. <br/>
                    You can use any email, even a nonexistent one, to sign up through the signup form.
				</p>
			</form>
		</div>
	);
}

export default SignupPage;
