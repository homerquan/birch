import React from "react";
import Conversations from "./Conversations";
import Layout from "../../components/Layout";
import {isLogin} from "../../utils";


const title = "Live Conversations";

export default {
	path: "/:id/conversations",

	action({store, params, query}) {
		let login = isLogin(store.getState());

		if (!login) {
    		return { redirect: "/login?redirect="+path };
  		}

		return {
			title,
			component: (
				<Layout>
					<Conversations title={title} bot={params.id} />
				</Layout>
			)
		};
	}
};
