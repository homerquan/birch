import React from "react";
import Conversations from "./Conversations";
import Layout from "../../components/Layout";
import {isLogin} from "../../utils";

export default {
	path: "/:id/conversations",

	action({store, params, query}) {
		let login = isLogin(store.getState());

		if (!login) {
    		return { redirect: '/login' };
  		}

		return {
			title: "Live conversations",
			component: (
				<Layout>
					<Conversations bot={params.id} />
				</Layout>
			)
		};
	}
};
