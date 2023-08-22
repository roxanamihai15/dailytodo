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
				setErrorMsg({ ...errorMsg, wrong_password: "password sbagliata" });
				console.log(errorMsg);
				console.log("entro qui?");
			}
			if (loginError === "Firebase: Error (auth/user-not-found).") {
				//  setErrorMsg('account sbagliata');
				setErrorMsg({ ...errorMsg, wrong_account: "ACCOUNT sbagliato" });
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

	// function handleSubmit(e) {
	//     e.preventDefault();
	//     console.log("email:", email);
	//     console.log("Password:", password);
	// }

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
					<FormHelperText>{errorMsg.wrong_password}</FormHelperText>
				</FormControl>

				{!error?.wrong_something && (
					<div>
						<p>{errorMsg.wrong_something}</p>{" "}
					</div>
				)}
				<Button
					variant="contained"
					type="submit"
					fullWidth
					// onClick={login}
				>
					Login
				</Button>
				<p>
					Non hai ancora un account?
					<button onClick={toggleForm} className="btn-link">
						Sign up
					</button>
				</p>
				<p className="info">
					Per accedere non riceverai nessuna mail di conferma, puoi usare
					qualsiasi mail anche inesistente per iscriverti nel form signup.
					Invece se vuoi accedere senza andare al form di signup puoi farlo
					usando queste credenziali Email: prova@gmail.com Password: 123456
				</p>
			</form>
		</div>
	);
}

export default LoginPage;
