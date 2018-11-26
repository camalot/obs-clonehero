'use strict';

const fs = require('fs');
const path = require('path');
const config = require('../../config');


let readTrack = () => {
	return new Promise((resolve, reject) => {
		console.log(config.clonehero);
		let filePath = path.join(config.clonehero.path, 'currentsong.txt');
		if (fs.existsSync(filePath)) {
			fs.readFile(filePath, 'utf8', (err, contents) => {
				if (err) {
					return reject(err);
				}
				let lines = contents.replace(/\r/g, '').split(/\n/);
				return resolve(lines);
			})
		} else {
			return reject('no data');
		}
	});
};

module.exports = {
	getTrack: () => {
		return new Promise((resolve, reject) => {
			return readTrack()
				.then(lines => {
					if (lines && lines.length) {
						return resolve({
							artist: lines[1] || "",
							track: lines[0] || "",
							album: lines[2] || ""
						});
					} else {
						return resolve(null);
					}
				}).catch((err) => {
					return resolve(null);
				});
		});
	}
};
