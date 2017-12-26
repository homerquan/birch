/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 19:36:24
 * @Last Modified by:   Homer
 * @Last Modified time: 2017-12-26 12:56:11
 */
import React from "react";
import Bots from "./Bots";
import Layout from "../../components/Layout";
import { isLogin } from "../../utils";

const title = "Properties & Apps";

export default {
	path: "/apps",

	action({store, params, query, path}) {
		let login = isLogin(store.getState());

		if (!login) {
			return { redirect: "/login?redirect="+path };
		}
		
		return {
			title,
			component: (
				<Layout>
					<Bots title={title} />
				</Layout>
			)
		};
	}
};
