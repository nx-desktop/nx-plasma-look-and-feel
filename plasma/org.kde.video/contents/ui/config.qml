import QtQuick 2.5
import QtQuick.Controls 1.4 as QtControls
import QtQuick.Controls 2.3 as QtControls2
import QtQuick.Layouts 1.2
import QtQuick.Dialogs 1.2

ColumnLayout {
	id: root
	property string cfg_Video
	property string cfg_Folder
	property int cfg_Fill
	property double cfg_Volume
	property double cfg_Rate
	property bool cfg_Shuffle

	FileDialog {
		id: fileDialog
		title: "Pick a video file"
		nameFilters: [
			"Video Files (*.mp4 *.ogv *.ogg *.avi *.mpg *.mpeg *.wmv *.mov *.webm *.flv *.mkv *.matroska)",
			"Playlist Files (*.m3u *.m3u8)",
			"All Files (*)"
		]
		onAccepted: {
			cfg_Video = fileDialog.fileUrls[0]
			cfg_Folder = fileDialog.folder
		}
	}

	Column {
		anchors.fill: parent
		spacing: units.largeSpacing / 2

		Row {
			spacing: units.largeSpacing / 2
			QtControls2.Label {
				width: formAlignment - units.largeSpacing
				horizontalAlignment: Text.AlignRight
				text: i18n("Source:")
			}
			QtControls.TextField {
				width: units.gridUnit * 11
				placeholderText: qsTr("Video or playlist")
				text: cfg_Video.toString().replace(/^file:\/\//,'')
				readOnly: true
				MouseArea {
					anchors.fill: parent
					onClicked: {
						fileDialog.folder = cfg_Folder
						fileDialog.open()
					}
				}
			}
		}

		Row {
			spacing: units.largeSpacing / 2
			QtControls2.Label {
				width: formAlignment - units.largeSpacing
				horizontalAlignment: Text.AlignRight
				text: i18n("Positioning:")
			}
			QtControls.ComboBox {
				width: units.gridUnit * 11
				currentIndex: cfg_Fill
				model: [ "Stretch", "Preserve Aspect, Fit", "Preserve Aspect, Crop" ]
				onCurrentIndexChanged: {
					cfg_Fill = currentIndex
				}
			}
		}

		Row {
			spacing: units.largeSpacing / 2
			QtControls2.Label {
				width: formAlignment - units.largeSpacing
				horizontalAlignment: Text.AlignRight
				text: i18n("Playback Rate:")
			}
			QtControls.Slider {
				value: cfg_Rate
				minimumValue: 0.5
				maximumValue: 2.0
				stepSize: 0.1
				onValueChanged: {
					cfg_Rate = value
					rateLabel.text = i18n(Number(value).toLocaleString(Qt.locale(), "f", 1) + "x")
				}
			}
			QtControls2.Label {
				id: rateLabel
				text: i18n(Number(cfg_Rate).toLocaleString(Qt.locale(), "f", 1) + "x")
			}
		}

		Row {
			spacing: units.largeSpacing / 2
			QtControls2.Label {
				width: formAlignment - units.largeSpacing
				horizontalAlignment: Text.AlignRight
				text: i18n("Volume:")
			}
			QtControls.Slider {
				value: cfg_Volume
				minimumValue: 0.0
				maximumValue: 1.0
				stepSize: 0.01
				onValueChanged: {
					cfg_Volume = value
					volumeLabel.text = i18n(Number(value).toLocaleString(Qt.locale(), "f", 2))
				}
			}
			QtControls2.Label {
				id: volumeLabel
				text: i18n(Number(cfg_Volume).toLocaleString(Qt.locale(), "f", 2))
			}
		}

		Row {
			spacing: units.largeSpacing / 2
			QtControls2.Label {
				width: formAlignment - units.largeSpacing
				horizontalAlignment: Text.AlignRight
				text: i18n("Shuffle Playlist:")
			}
			QtControls.CheckBox {
				text: i18n("Enabled")
				checked: cfg_Shuffle
				onCheckedChanged: {
					cfg_Shuffle = checked
				}
			}
		}
	}
}
