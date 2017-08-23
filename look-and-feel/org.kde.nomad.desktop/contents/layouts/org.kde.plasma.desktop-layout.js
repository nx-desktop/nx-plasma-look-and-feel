var plasma = getApiVersion(1);

var layout = {
    "desktops": [
        {
            "applets": [
            ],
            "config": {
                "/": {
                    "formfactor": "0",
                    "immutability": "1",
                    "lastScreen": "0",
                    "wallpaperplugin": "org.kde.image"
                },
                "/ConfigDialog": {
                    "DialogHeight": "480",
                    "DialogWidth": "640"
                },
                "/General": {
                    "ToolBoxButtonState": "bottomright",
                    "ToolBoxButtonX": "2544",
                    "ToolBoxButtonY": "997",
                    "showToolbox": "false"
                },
                "/Wallpaper/org.kde.image/General": {
                    "FillMode": "2",
                    "Image": "file:///home/alexis/Pictures/BdNvWmA.png"
                }
            },
            "wallpaperPlugin": "org.kde.image"
        }
    ],
    "panels": [
        {
            "alignment": "left",
            "applets": [],
            "config": {
                "/": {
                    "formfactor": "2",
                    "immutability": "1",
                    "lastScreen": "0",
                    "wallpaperplugin": "org.kde.image"
                },
                "/ConfigDialog": {
                    "DialogHeight": "80",
                    "DialogWidth": "2560"
                }
            },
            "height": 1.875,
            "hiding": "normal",
            "location": "top",
            "maximumLength": 160,
            "minimumLength": 160,
            "offset": 0
        },
    ],
    "serializationFormatVersion": "1"
}
;

plasma.loadSerializedLayout(layout);
