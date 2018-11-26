'use strict';

const config = require('../../config');

let getTrackInfo = (data) => {
	return new Promise((resolve, reject) => {
		if(data.artist === '' || data.track === '') {
			return resolve(null);
		}
		const reqest = config.clonehero.lastfm.startsWith('https://') ? require('https') : require('http');
		reqest.get(`${config.clonehero.lastfm}/${data.artist}/${data.track}`, (res) => {
			const body = [];
			res.on('data', (chunk) => body.push(chunk));

			res.on('end', () => {
				return resolve(JSON.parse(body.join('')));
			});
		}).on('error', (e) => {
			return reject(e);
		});
	});
};

module.exports = {
	getTrackInfo: getTrackInfo
};
