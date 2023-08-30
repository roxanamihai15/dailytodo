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
import { useNavigate, useLocation } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage({ toggleForm }) {
	const navigate = useNavigate();
	const location = useLocation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState({
		// wrong_account: '',
		// wrong_password: '',
		// wrong_something: ''
	});

	// const from = location.state?.form?.pathname
	const from = location.state?.form?.pathname || "/home";

	const { error, login } = userLogin();

	const handleLogin = async (e) => {
		e.preventDefault();
		setErrorMsg({});
		// await login(email, password)
		const loginError = await login(email, password); // Ottiene l'errore dal login

		console.log(error);
		console.log(loginError);

		if (!loginError) {
			// Controlla se c'è un errore
			// if (!error) {
			navigate(from, { replace: true });
			setEmail("");
			setPassword("");
			return;
		} else {
			// setErrorMsg(error)
			if (loginError === "Firebase: Error (auth/wrong-password).") {
				// setErrorMsg('password sbagliata');
				setErrorMsg({ ...errorMsg, wrong_password: "Invalid password" });
				console.log(errorMsg);
				console.log("entro qui?");
			}
			if (loginError === "Firebase: Error (auth/user-not-found).") {
				//  setErrorMsg('account sbagliata');
				setErrorMsg({ ...errorMsg, wrong_account: "Couldn't find your account" });
				console.log(errorMsg);
				console.log("entro qui?");
			}
			if (
				loginError !== "Firebase: Error (auth/user-not-found)." &&
				loginError !== "Firebase: Error (auth/wrong-password)."
			) {
				// setErrorMsg(loginError);
				setErrorMsg({ wrong_something: loginError });
				console.log(errorMsg);
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
			<h1>Login to your account</h1>
			<form action="" onSubmit={handleLogin}>
				<TextField
					sx={{ width: "100%" }}
					label="Email"
					// variant="filled"
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
					sx={{ m: 1, width: "100%" }}
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
						{/* <p className="error">{errorMsg.wrong_something}</p> */}
					</div>
				)}

				<Button
					variant="contained"
					type="submit"
					fullWidth
					// onClick={login}
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
				{/* <p className="info">
                    Non verrà inviata alcuna email di conferma per il processo di accesso. È possibile utilizzare qualsiasi indirizzo email, anche se non esistente, per registrarsi tramite il modulo di Sign up.
                    Tuttavia, se si preferisce accedere senza passare attraverso il modulo di iscrizione, è possibile farlo utilizzando le seguenti credenziali:                    
                    <span>Email:</span> prova@gmail.com
                    <span>Password:</span> 123456
				</p> */}
			</form>
		</div>
	);
}

export default LoginPage;
