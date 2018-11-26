# OBS-CLONEHERO

Display `now playing` track information as an OBS Overlay

## ENDPOINTS

`/overlay/`

### CUSTOMIZATION

#### CSS CLASSES

- `#scobble` : Container of the scobble info
- `.lastfm-art` : Container for the `img` for the album art
- `.lastfm-art img.default-image` : When there is no album art
- `.lastfm-title` : Container for the song title
- `.lastfm-artist` : Container for the artist
- `.lastfm-album` : Container for the name of the album

### DOCKER

The container exposes port 3000. `-P` will map the port on the host.

```shell
$ docker run -d -P \
	--restart unless-stopped \
	--name "obs-clonehero" \
	-e OCH_CLONEHERO_PATH="${OCH_CLONEHERO_PATH}" \
	-e OCH_LASTFM_LOOKUP="${OCH_LASTFM_LOOKUP}" \
	-t camalot/obs-lastfm
```

### LOCAL

- Create a `.env` file in the `obs-clonehero` directory. 
- Add the following:
```
OCH_CLONEHERO_PATH=<path-to-clone-hero-directory>
OCH_LASTFM_LOOKUP=<url-to-lastfm-lookup-service>
```
- Open shell and run the following:
```shell
$ npm install
$ npm start
```
- Open a browser to `http://localhost:3000/overlay/`


## SETUP OBS

- Add New Browser Source
- Enter the URL to the overlay: `http://localhost:3000/overlay/`
- Set the `width` to `450`
- Set the `height` to `72`
