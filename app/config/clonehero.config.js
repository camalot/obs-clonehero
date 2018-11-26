
'use strict';
const npmpackage = require("../../package.json");
let result = {
	clonehero: {
		lastfm: process.env.OCH_LASTFM_LOOKUP,
		path: process.env.OCH_CLONEHERO_PATH || "./clonehero",
		VERSION: npmpackage.version,
		POLL: parseInt(process.env.OCH_POLL_INTERVAL || "5000", 0)
	}
};

if(!result.clonehero.lastfm || result.clonehero.lastfm === "") {
	throw new Error("OCH_LASTFM_LOOKUP url not set");
}

module.exports = result;
