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
                    "ToolBoxButtonState": "left",
                    "ToolBoxButtonX": "1",
                    "ToolBoxButtonY": "166",
                    "pressToMove": "false",
                    "showToolbox": "false"
                },
                "/Wallpaper/org.kde.image/General": {
                    "FillMode": "2",
                    "Image": "file:///usr/share/wallpapers/Fifth/contents/images/1920x1080.png",
                    "height": "768",
                    "width": "1360"
                }
            },
            "wallpaperPlugin": "org.kde.image"
        }
    ],
    "panels": [
        {
            "alignment": "left",
            "applets": [
                {
                    "config": {
                        "/": {
                            "immutability": "1"
                        },
                        "/Configuration/ConfigDialog": {
                            "DialogHeight": "480",
                            "DialogWidth": "640"
                        },
                        "/Configuration/General": {
                            "customButtonImage": "file:///usr/share/icons/Lüv/actions/22/view-list-icons.svg",
                            "favoriteApps": "preferred://browser,systemsettings.desktop,org.kde.dolphin.desktop,org.kde.kate.desktop",
                            "length": "674",
                            "useCustomButtonImage": "true"
                        },
                        "/Shortcuts": {
                            "global": "Alt+F1"
                        }
                    },
                    "plugin": "org.kde.plasma.nomadmenu"
                },
                {
                    "config": {
                        "/": {
                            "immutability": "1"
                        }
                    },
                    "plugin": "org.nomad-shell.panel.separator"
                },
                {
                    "config": {
                        "/": {
                            "immutability": "1"
                        }
                    },
                    "plugin": "org.kde.plasma.systemtray"
                },
                {
                    "config": {
                        "/": {
                            "immutability": "1"
                        }
                    },
                    "plugin": "org.kde.plasma.panelspacer"
                },
                {
                    "config": {
                        "/": {
                            "immutability": "1"
                        },
                        "/Configuration/ConfigDialog": {
                            "DialogHeight": "480",
                            "DialogWidth": "640"
                        },
                        "/Shortcuts": {
                            "global": ""
                        }
                    },
                    "plugin": "nomad-shell.status-panel"
                },
                {
                    "config": {
                        "/": {
                            "immutability": "1"
                        },
                        "/Configuration/Appearance": {
                            "use24hFormat": "0"
                        },
                        "/Configuration/ConfigDialog": {
                            "DialogHeight": "480",
                            "DialogWidth": "640"
                        }
                    },
                    "plugin": "org.kde.plasma.digitalclock"
                }
            ],
            "config": {
                "/": {
                    "formfactor": "2",
                    "immutability": "1",
                    "lastScreen": "0",
                    "wallpaperplugin": "org.kde.image"
                },
                "/ConfigDialog": {
                    "DialogHeight": "80",
                    "DialogWidth": "1360"
                }
            },
            "height": 1.875,
            "location": "top",
            "maximumLength": 85,
            "minimumLength": 85,
            "offset": 0
        },
        {
            "alignment": "left",
            "applets": [
                {
                    "config": {
                        "/": {
                            "immutability": "1"
                        },
                        "/Configuration/ConfigDialog": {
                            "DialogHeight": "480",
                            "DialogWidth": "640"
                        },
                        "/Configuration/General": {
                            "durationTime": "1",
                            "launchers": "multi;*;5;file:///usr/share/applications/org.kde.dolphin.desktop;file:///usr/share/applications/org.kde.kate.desktop;file:///usr/share/applications/org.kde.konsole.desktop;file:///usr/share/applications/qupzilla.desktop;file:///usr/share/applications/systemsettings.desktop",
                            "showBarLine": "false",
                            "showOnlyCurrentActivity": "false",
                            "showOnlyCurrentDesktop": "true",
                            "showShadows": "false",
                            "showToolTips": "true",
                            "showWindowActions": "true",
                            "threeColorsWindows": "true",
                            "useThemePanel": "false",
                            "zoomLevel": "0"
                        }
                    },
                    "plugin": "org.kde.store.nowdock.plasmoid"
                }
            ],
            "config": {
                "/": {
                    "formfactor": "2",
                    "immutability": "1",
                    "lastScreen": "0",
                    "wallpaperplugin": "org.kde.image"
                },
                "/ConfigDialog": {
                    "DialogHeight": "80",
                    "DialogWidth": "1360"
                }
            },
            "height": 4.125,
            "location": "bottom",
            "maximumLength": 85,
            "minimumLength": 85,
            "offset": 0
        }
    ],
    "serializationFormatVersion": "1"
}
;
 
plasma.loadSerializedLayout(layout);
