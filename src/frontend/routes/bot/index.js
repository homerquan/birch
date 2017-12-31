/*
* @Author: Homer
* @Date:   2017-12-26 21:21:15
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-30 22:56:34
*/

import React from "react";
import { isLogin } from "../../utils";

// a redirect route, for bot overview later
export default {
	path: "/:id",
	action({ store, params, query, path }) {
		if (
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
				path
			)
		) {
			let login = isLogin(store.getState());

			if (!login) {
				return { redirect: "/login?redirect=" + path };
			}

			return { redirect: path + "/conversations" };
		}
	}
};
