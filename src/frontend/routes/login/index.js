/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
import FullScreen from "../../components/Layout/Fullscreen";
import Login from "../../views/login/Login";
import Paper from "material-ui/Paper";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { deepPurple500, white } from "material-ui/styles/colors";
import Background from "./bg.svg";
const title = "Log In";

const styles = {
	loginScreen: {
		backgroundImage: `url(${Background})`,
		width: "100%",
		height: "100%",
		position: "fixed",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover"
	},
	loginPaper: {
		height: 600,
		width: 600,
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)"
	}
};

export default {
	path: "/login",

	action() {
		return {
			title,
			component: (
				<FullScreen>
					<MuiThemeProvider>
						<div style={styles.loginScreen}>
							<Paper style={styles.loginPaper} zDepth={2}>
								<Login title={title} />
							</Paper>
						</div>
					</MuiThemeProvider>
				</FullScreen>
			)
		};
	}
};
