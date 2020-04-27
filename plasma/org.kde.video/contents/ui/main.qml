// https://doc.qt.io/qt-5/qml-qtmultimedia-mediaplayer.html
// https://doc.qt.io/qt-5/qml-qtmultimedia-playlist.html
// https://doc.qt.io/qt-5/qml-qtmultimedia-videooutput.html

import QtQuick 2.5
import QtMultimedia 5.6
import org.kde.plasma.core 2.0 as Plasmacore

Item {
	function loadPlaylist(url) {
		playlist.clear();

		var extension = url.split(".").pop();
		if (extension == "m3u" || extension == "m3u8") {
			playlist.load(url);
		} else {
			playlist.addItem(url);
		}

		if (MediaPlayer.playbackState != MediaPlayer.PlayingState) {
			mediaplayer.play();
		}

		return true;
	}

	MediaPlayer {
		id: mediaplayer
		autoPlay: true
		volume: wallpaper.configuration.Volume
		muted: wallpaper.configuration.Volume == 0
		playbackRate: wallpaper.configuration.Rate

		playlist: Playlist {
			id: playlist
			playbackMode: wallpaper.configuration.Shuffle == true ? Playlist.Random : Playlist.Loop
			property var loaded: loadPlaylist(wallpaper.configuration.Video)
		}
	}

	VideoOutput {
		id: videooutput
		anchors.fill: parent
		fillMode: {
			if(wallpaper.configuration.Fill == 0) {
				return VideoOutput.Stretch
			} else if(wallpaper.configuration.Fill == 1) {
				return VideoOutput.PreserveAspectFit
			} else if(wallpaper.configuration.Fill == 2) {
				return VideoOutput.PreserveAspectCrop
			}
			return VideoOutput.PreserveAspectCrop
		}
		source: mediaplayer
	}
}
