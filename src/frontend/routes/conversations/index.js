import React from "react";
import Conversations from "./Conversations";
import Layout from "../../components/Layout";

export default {
	path: "/conversations",

	action() {
		return {
			title: "Live conversations",
			component: (
				<Layout>
					<Conversations />
				</Layout>
			)
		};
	}
};
