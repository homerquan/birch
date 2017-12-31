import React from "react";
import Conversations from "./Conversations";
import Layout from "../../components/Layout";
import {isLogin} from "../../utils";


const title = "Live Conversations";

export default {
	path: "/:id/conversations",
	chunk: 'conversations',
	action({store, params, query, path}) {
		let login = isLogin(store.getState());

		if (!login) {
    		return { redirect: "/login?redirect="+path };
  		}

		return {
			title,
			component: (
				<Layout>
					<Conversations title={title} botId={params.id} />
				</Layout>
			)
		};
	}
};
