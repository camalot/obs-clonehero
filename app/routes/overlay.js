'use strict';
const express = require('express');
const router = express.Router();
const lastfm = require('../lib/lastfm');
const clonehero = require('../lib/clonehero');

router.get('/:video?', (req, res, next) => {
	console.log("overlay load");
	let pvideo = req.params.video;
	let video = {
		url: pvideo ? `https://i.imgur.com/${pvideo}.mp4` : null,
		enabled: pvideo ? true : false
	};
	clonehero.getTrack()
		.then((data) => {
			console.log(data);
			return lastfm.getTrackInfo({ artist: data.artist, track: data.track, album: data.album });
		})
		.then((track) => {
			console.log(track);
			return res.render("overlay", { track: track, video: video });
		}).catch((err) => {
			return next(err);
		});

});


module.exports = router;
