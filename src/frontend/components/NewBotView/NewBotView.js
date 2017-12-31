/*
* @Author: Homer
* @Date:   2017-12-31 16:47:27
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-31 18:50:41
*/

import React from "react";
import { Field, reduxForm } from "redux-form";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./NewBotView.css";

class NewBotView extends React.Component {

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<form onSubmit={handleSubmit}>
				<div>
					<label>First Name</label>
					<div>
						<Field
							name="firstName"
							component="input"
							type="text"
							placeholder="First Name"
						/>
					</div>
				</div>
				<div>
					<label>Last Name</label>
					<div>
						<Field
							name="lastName"
							component="input"
							type="text"
							placeholder="Last Name"
						/>
					</div>
				</div>
				<div>
					<label>Email</label>
					<div>
						<Field
							name="email"
							component="input"
							type="email"
							placeholder="Email"
						/>
					</div>
				</div>
				<div>
					<label>Sex</label>
					<div>
						<label>
							<Field
								name="sex"
								component="input"
								type="radio"
								value="male"
							/>{" "}
							Male
						</label>
						<label>
							<Field
								name="sex"
								component="input"
								type="radio"
								value="female"
							/>{" "}
							Female
						</label>
					</div>
				</div>
				<div>
					<label>Favorite Color</label>
					<div>
						<Field name="favoriteColor" component="select">
							<option />
							<option value="ff0000">Red</option>
							<option value="00ff00">Green</option>
							<option value="0000ff">Blue</option>
						</Field>
					</div>
				</div>
				<div>
					<label htmlFor="employed">Employed</label>
					<div>
						<Field
							name="employed"
							id="employed"
							component="input"
							type="checkbox"
						/>
					</div>
				</div>
				<div>
					<label>Notes</label>
					<div>
						<Field name="notes" component="textarea" />
					</div>
				</div>
				<div>
					<button type="submit" disabled={pristine || submitting}>
						Submit
					</button>
					<button
						type="button"
						disabled={pristine || submitting}
						onClick={reset}
					>
						Clear Values
					</button>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: "NewBot"
})(withStyles(s)(NewBotView));
