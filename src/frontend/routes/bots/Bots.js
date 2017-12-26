/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 19:34:16
 * @Last Modified by:   Homer
 * @Last Modified time: 2017-12-25 20:43:38
 */
import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import withStyles from "isomorphic-style-loader/lib/withStyles";

class Bots extends React.Component {
	render() {
		return <img src="/mocks/conversation.png" />;
	}
}

export default compose()(Bots);
