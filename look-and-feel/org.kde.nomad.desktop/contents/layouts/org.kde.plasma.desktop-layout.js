var plasma = getApiVersion(1)

// Create top pannel
panel = new Panel()
panel.location = "top"
panel.alignment = "center"

// Add widgets
var menu = panel.addWidget("org.kde.plasma.nomadmenu")

// Configure favorite apps
menu.currentConfigGroup = ["General"]
menu.writeConfig("favoriteApps", "systemsettings.desktop,org.kde.dolphin.desktop,org.kde.kate.desktop,chromium-browser.desktop")
    // Configure menu shortcut
menu.currentConfigGroup = ["Shortcuts"]
menu.writeConfig("global", "Alt+F1")


panel.addWidget("org.kde.plasma.appmenu")
panel.addWidget("org.kde.plasma.panelspacer")
var systray = panel.addWidget("org.nomad.systemtray")

// Don't load widgets overwriten in nomad
var systrayContainmentId = systray.readConfig('SystrayContainmentId')
var systrayContainer = desktopById(systrayContainmentId)
systrayContainer.currentConfigGroup = ['General']
systrayContainer.writeConfig("knownItems", "org.kde.plasma.networkmanagement,org.kde.plasma.notifications,org.kde.plasma.mediacontroller,org.kde.plasma.devicenotifier,org.kde.plasma.volume")

panel.addWidget("org.nomad.clock")