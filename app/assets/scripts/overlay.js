"use strict";
$(function () {
	let scobble = $("#scobble");
	let pollInterval = parseInt(scobble.data("poll") || "5000", 0);

	setInterval(function () {
		$.ajax(`/api/track/`, {
			success: (data, text, xhr) => {
				if (data === null) {
					scobble
						.fadeOut("fast");
					return;
				} else {
					scobble
						.fadeIn("fast", () => {
							if (scobble.data("id") !== data.id) {
								updateSong(scobble, data, () => {
								});
							}
						});
				}
			}
		});
	}, pollInterval);

	function getImageUrl(url) {
		if(url) {
			return url;
		} else {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
		}
	}

	function updateSong(scobble, data, callback) {
		let container = $(".scobble-container", scobble);
		scobble.data("id", data.id || data.title.toLowerCase().replace(/\s/gi, ""));
		data.image = data.image == "" || data.image === undefined ? null : data.image;

		let $image = $(".lastfm-art img", scobble);
		let $title = $(".lastfm-title", scobble);
		let $artist = $(".lastfm-artist", scobble);
		let $album = $(".lastfm-album", scobble);

		container.animate({ "left": '-=500' }, () => {
			$image.attr("src", getImageUrl(data.image));
			if( !data.image || data.image.startsWith("data:image/png;base64,") ) {
				$image.addClass("default-image");
			} else {
				$image.removeClass("default-image");
			}
			$title.text(data.title || "");
			$artist.text(data.artist || "");
			$album.text(data.album || "");
		})
		.animate({ "left": '+=500' }, callback);
	}
});
