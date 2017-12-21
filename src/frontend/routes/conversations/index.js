import React from "react";
import Conversations from "./Conversations";
import Layout from "../../components/Layout";
import {isLogin} from "../../utils";

export default {
	path: "/conversations",

	action({ store }) {
		let login = isLogin(store.getState());
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
