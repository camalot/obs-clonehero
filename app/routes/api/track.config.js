"use strict";

const xconfig = require("../config");
const merge = require("merge");

let config = {
	home: {
		route: "/api/track"
	}
};

module.exports = merge(xconfig, config);
