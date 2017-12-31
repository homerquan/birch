/*
* @Author: Homer
* @Date:   2017-12-31 18:26:19
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-31 18:50:09
*/
import React from "react";
import NewBot from "./NewBot";
import Layout from "../../components/Layout";

const title = "Create a new property & app";

export default {
	path: "/new_bot",
	chunk: '/newBot',
	action() {
		return {
			title,
			chunk: 'newBot',
			component: (
				<Layout>
					<NewBot title={title} />
				</Layout>
			),
			status: 404
		};
	}
};
