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
import React, { useState } from "react";
import userLogin from "../auth/userLogin";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage({ toggleForm }) {
	const navigate = useNavigate();  // se login ok, lo uso per mandare l'utente sulla pagina "protetta", home

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState({});

    // importo da userlogin.js queste 2 cose 
	const { error, login } = userLogin();

    // network call, quindi async
	const handleLogin = async (e) => {
		e.preventDefault();
		setErrorMsg({});
		const loginError = await login(email, password); // Ottiene l'errore dal login


		if (!loginError) {
			navigate("/home", { replace: true });   //replace true dovrebbe toglierlo dalla history della navigazione ma non funziona
			setEmail("");
			setPassword("");
			return;   // se tutto giusto: entra nella home, cancella i campi input, esci dalla funzione
		} else {

            setErrorMsg({});

			if (loginError === "Firebase: Error (auth/wrong-password).") {
				setErrorMsg({ ...errorMsg, wrong_password: "Invalid password" });
			}
			if (loginError === "Firebase: Error (auth/user-not-found).") {
				setErrorMsg({ ...errorMsg, wrong_account: "Couldn't find your account" });
			}
			if (
				loginError !== "Firebase: Error (auth/user-not-found)." &&
				loginError !== "Firebase: Error (auth/wrong-password)."
			) {
				setErrorMsg({ wrong_something: loginError });
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
			<h1>Login to your account</h1>
			<form onSubmit={handleLogin}>
				<TextField
					label="Email"
					variant="outlined"
					margin="dense"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={errorMsg.wrong_account ? true : false}
					helperText={errorMsg.wrong_account}
					fullWidth
				/>

				<FormControl
                    fullWidth
					variant="outlined"
					margin="dense"
					error={errorMsg.wrong_password ? true : false}
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
					{errorMsg.wrong_password && <FormHelperText>{errorMsg.wrong_password}</FormHelperText>}
				</FormControl>

				{!error?.wrong_something && (
					<div>
						<FormHelperText error>{errorMsg.wrong_something}</FormHelperText>
					</div>
				)}

				<Button
					variant="contained"
					type="submit"
					fullWidth
                    color="secondary"
				>
					Login
				</Button>
				<p>
					Don't have an account?
					<button onClick={toggleForm} className="btn-link">
						Sign up
					</button>
				</p>
				<p className="info">
					You won't receive any confirmation email to complete the access. You can use any email address, even a non-existent one, to sign up through the registration form.  <br/>
                    <br/> Alternatively, if you wish to access without going through the signup form, you can do so using the following credentials: <br/>
                    <span>Email</span> prova@gmail.com <br/>
                    <span>Password</span> 123456
				</p>
			</form>
		</div>
	);
}

export default LoginPage;
