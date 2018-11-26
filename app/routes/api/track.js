'use strict';
const express = require('express');
const router = express.Router();
const lastfm = require('../../lib/lastfm');
const clonehero = require('../../lib/clonehero');


router.get('/', (req, res, next) => {
	return clonehero.getTrack()
		.then((data) => {
			if (data) {
				return lastfm.getTrackInfo(data);
			} else {
				return new Promise((resolve, reject) => {
					return resolve(null);
				});
			}
		})
		.then((track) => {
			return res.json(track);
		}).catch((err) => {
			console.error(err);
			return next(err);
		});
});

router.get('/raw/', (req, res, next) => {

	return clonehero.getTrack()
		.then((data) => {
			if (data) {
				return lastfm.getTrackInfo(data);
			} else {
				return new Promise((resolve, reject) => {
					return resolve(null);
				});
			}
		})
		.then((tracks) => {
			return res.json(tracks);
		}).catch((err) => {
			console.error(err);
			return next(err);
		});
});

module.exports = router;
