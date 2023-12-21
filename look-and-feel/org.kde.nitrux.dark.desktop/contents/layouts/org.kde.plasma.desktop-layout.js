
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   The license used for this file and its contents is: BSD-3-Clause                                                                                                        /
//                                                                                                                                                                           /
//   Copyright <2023> <Uri Herrera <uri_herrera@nxos.org>>                                                                                                                   /
//                                                                                                                                                                           /
//   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:                          /
//                                                                                                                                                                           /
//    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.                                        /
//                                                                                                                                                                           /
//    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer                                      /
//       in the documentation and/or other materials provided with the distribution.                                                                                         /
//                                                                                                                                                                           /
//    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software                    /
//       without specific prior written permission.                                                                                                                          /
//                                                                                                                                                                           /
//    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,                      /
//    THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS                  /
//    BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE                 /
//    GOODS OR SERVICES; LOSS OF USE, DATA,   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,                      /
//    STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.   /
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set Plasma Desktop Scripting API.
var plasma = getApiVersion(1)

// Set wallpaper plugin.
var allDesktops = desktops();
for (i=0;i<allDesktops.length;i++){
  d = allDesktops[i];
  d.wallpaperPlugin = "a2n.blur";
  d.currentConfigGroup = Array("Wallpaper", "a2n.blur", "General");
}

// Top panel.
const menuPanel = new Panel
var menuPanelScreen = menuPanel.screen
menuPanel.location = "top"
menuPanel.height = Math.round(gridUnit * 1.5)

// Restrict horizontal top panel to a maximum size of a 21:9 monitor
const maximumAspectRatio = 21/9;
if (menuPanel.formFactor === "horizontal") {
    const geo = screenGeometry(menuPanelScreen);
    const maximumWidth = Math.ceil(geo.height * maximumAspectRatio);

    if (geo.width > maximumWidth) {
        menuPanel.alignment = "center";
        menuPanel.minimumLength = maximumWidth;
        menuPanel.maximumLength = maximumWidth;
    }
}

// Add and configure top panel widgets in order of placement.
var windowButtons = menuPanel.addWidget("org.kde.windowbuttons")
windowButtons.currentConfigGroup = ["Configuration", "General"]
windowButtons.writeConfig("buttonSizePercentage", "75")
windowButtons.writeConfig("hiddenState", "EmptySpace")
windowButtons.writeConfig("inactiveStateEnabled", true)
windowButtons.writeConfig("lengthFirstMargin", "4")
windowButtons.writeConfig("lengthLastMargin", "4")
windowButtons.writeConfig("visibility", "3")

var latteSeparatorTop1 = menuPanel.addWidget("org.kde.latte.separator")
latteSeparatorTop1.currentConfigGroup = ["Configuration", "General"]
latteSeparatorTop1.writeConfig("lengthMargin", "10")
latteSeparatorTop1.writeConfig("thickMargin", "6")

var windowTitle = menuPanel.addWidget("org.kde.windowtitle")
windowTitle.currentConfigGroup = ["Configuration", "General"]
windowTitle.writeConfig("capitalFont", false)
windowTitle.writeConfig("showIcon", false)
windowTitle.writeConfig("style", "ApplicationTitle")

var latteSeparatorTop2 = menuPanel.addWidget("org.kde.latte.separator")
latteSeparatorTop2.currentConfigGroup = ["Configuration", "General"]
latteSeparatorTop2.writeConfig("lengthMargin", "10")
latteSeparatorTop2.writeConfig("thickMargin", "6")

menuPanel.addWidget("org.kde.plasma.appmenu")
menuPanel.addWidget("org.kde.plasma.panelspacer")

var latteSeparatorTop3 = menuPanel.addWidget("org.kde.latte.separator")
latteSeparatorTop3.currentConfigGroup = ["Configuration", "General"]
latteSeparatorTop3.writeConfig("lengthMargin", "10")
latteSeparatorTop3.writeConfig("thickMargin", "6")

menuPanel.addWidget("org.kde.plasma.systemtray")

var latteSeparatorTop4 = menuPanel.addWidget("org.kde.latte.separator")
latteSeparatorTop4.currentConfigGroup = ["Configuration", "General"]
latteSeparatorTop4.writeConfig("lengthMargin", "10")
latteSeparatorTop4.writeConfig("thickMargin", "6")

var digitalClock = menuPanel.addWidget("org.kde.plasma.digitalclock")
digitalClock.currentConfigGroup = ["Configuration", "General"]
digitalClock.writeConfig("autoFontAndSize", false)
digitalClock.writeConfig("enabledCalendarPlugins", "/usr/lib/x86_64-linux-gnu/qt5/plugins/plasmacalendarplugins/holidaysevents.so")
digitalClock.writeConfig("fontFamily", "Homenaje")
digitalClock.writeConfig("fontSize", "14")
digitalClock.writeConfig("showDate", false)
digitalClock.writeConfig("showSeconds", true)

// Bottom panel (Dock).
var bottomPanel = new Panel
bottomPanel.location = "floating"
bottomPanel.height = 2 * Math.floor(gridUnit * 2.9 / 2)
bottomPanel.hiding = "windowscover"
//bottomPanel.offset = 1
// bottomPanel.alignment = "center"
// bottomPanel.minimumLength = 1440
// bottomPanel.maximumLength = 1440

var bottomPanelScreen = bottomPanel.screen

// Restrict horizontal top panel to a maximum size of a 21:9 monitor
if (menuPanel.formFactor === "horizontal") {
    const geo = screenGeometry(bottomPanelScreen);
    const maximumWidth = Math.ceil(geo.height * maximumAspectRatio);

    if (geo.width > maximumWidth) {
        bottomPanel.alignment = "center";
        bottomPanel.minimumLength = 1440;
        bottomPanel.maximumLength = maximumWidth;
    }
}


// Add and configure bottom panel widgets in order of placement.
var bottomPanelSeparatorLeft = bottomPanel.addWidget("org.kde.plasma.panelspacer")
bottomPanelSeparatorLeft.writeConfig("expanding", false)
bottomPanelSeparatorLeft.writeConfig("length", "10")

var plasmaDrawer = bottomPanel.addWidget("P-Connor.PlasmaDrawer")
plasmaDrawer.currentConfigGroup = ["Configuration", "General"]
plasmaDrawer.writeConfig("animationSpeedMultiplier", "1.3000000000000003")
plasmaDrawer.writeConfig("appIconSize", "128")
plasmaDrawer.writeConfig("backgroundOpacity", "90")
plasmaDrawer.writeConfig("hiddenApplications", "appimagekit_e00131cdaf6606b58dc63e02f6f9667a-appimage-cli-tool.desktop,appimagekit_691afdd8254cdd6210cad9fe09dc3c0c-appimage-cli-tool.desktop,appimagekit_c622bf8ce674464048e56ad7b1c9c3ec-AppImageUpdate.desktop,appimagekit_33264d7382d4da20e2058b56c70584b3-Firefox.desktop,appimagekit_13e096f2a11dd27115677128a912dbba-Firefox.desktop,org.kde.kmenuedit.desktop,appimagekit_cc22cf1990cbd4ea25c2cd3f9236c9d9-appimage-cli-tool.desktop,org.maui.settings.desktop,org.kde.fiery.desktop,org.kde.latte-dock.desktop,org.kde.agenda.desktop,org.kde.communicator.desktop,appimagekit_654a6860494c0adba861ecb314e23fe4-Firefox.desktop,org.kde.booth.desktop,org.fcitx.Fcitx5.desktop,setup-mozc.desktop,im-config.desktop,appimagekit_89688fd275690f87364cb0aa03793f66-Hardware_Probe.desktop,appimagekit_18fdaa3ea99118c7b9bee6bc187e2d70-Hardware_Probe.desktop,org.kde.kwalletmanager5.desktop")
plasmaDrawer.writeConfig("numberColumns", "6")
plasmaDrawer.writeConfig("numberRows", "4")
plasmaDrawer.writeConfig("searchIconSize", "250")
plasmaDrawer.writeConfig("scrollAnimationDuration", "250")
plasmaDrawer.writeConfig("showFavorites", false)
plasmaDrawer.writeConfig("showSystemActions", false)
plasmaDrawer.writeConfig("spaceHeight", "20")
plasmaDrawer.writeConfig("spaceWidth", "20")
plasmaDrawer.writeConfig("useCustomSizeGrid", true)

plasmaDrawer.currentConfigGroup = ["Shortcuts"]
plasmaDrawer.writeConfig("global", "Alt+F1")

var latteSeparatorBottom1 = bottomPanel.addWidget("org.kde.latte.separator")
latteSeparatorBottom1.currentConfigGroup = ["Configuration", "General"]
latteSeparatorBottom1.writeConfig("lengthMargin", "16")
latteSeparatorBottom1.writeConfig("thickMargin", "12")

var configurableButton = bottomPanel.addWidget("com.github.configurable_button")
configurableButton.currentConfigGroup = ["Configuration", "General"]
configurableButton.writeConfig("iconOff", "view-file-columns")
configurableButton.writeConfig("iconOn", "view-file-columns")
configurableButton.writeConfig("offScript", "qdbus org.kde.kglobalaccel /component/kwin invokeShortcut 'Overview'")
configurableButton.writeConfig("onScript", "qdbus org.kde.kglobalaccel /component/kwin invokeShortcut 'Overview'")

var latteSeparatorBottom2 = bottomPanel.addWidget("org.kde.latte.separator")
latteSeparatorBottom2.currentConfigGroup = ["Configuration", "General"]
latteSeparatorBottom2.writeConfig("lengthMargin", "16")
latteSeparatorBottom2.writeConfig("thickMargin", "12")

var dockTaskManager = bottomPanel.addWidget("org.kde.plasma.icontasks")
dockTaskManager.currentConfigGroup = ["Configuration", "General"]
dockTaskManager.writeConfig("fill", false)
dockTaskManager.writeConfig("iconSpacing", 2)
dockTaskManager.writeConfig("groupPopups", false)
dockTaskManager.writeConfig("highlightWindows", false)
dockTaskManager.writeConfig("launchers", ["applications:org.kde.index.desktop", "applications:org.nx.softwarecenter.desktop", "applications:firefox.desktop", "applications:org.kde.nota.desktop", "applications:org.kde.vvave.desktop", "applications:org.kde.clip.desktop", "applications:org.kde.station.desktop"]);
dockTaskManager.writeConfig("maxStripes", 1)
dockTaskManager.writeConfig("showOnlyCurrentDesktop", true)
dockTaskManager.writeConfig("showOnlyCurrentScreen", false)

var latteSeparatorBottom3 = bottomPanel.addWidget("org.kde.latte.separator")
latteSeparatorBottom3.currentConfigGroup = ["Configuration", "General"]
latteSeparatorBottom3.writeConfig("lengthMargin", "16")
latteSeparatorBottom3.writeConfig("thickMargin", "12")

bottomPanel.addWidget("org.kde.plasma.trash")

var latteSeparatorBottom4 = bottomPanel.addWidget("org.kde.latte.separator")
latteSeparatorBottom4.currentConfigGroup = ["Configuration", "General"]
latteSeparatorBottom4.writeConfig("lengthMargin", "16")
latteSeparatorBottom4.writeConfig("thickMargin", "12")

var sessionControlsButton = bottomPanel.addWidget("org.kde.plasma.lock_logout")
sessionControlsButton.currentConfigGroup = ["Configuration", "General"]
sessionControlsButton.writeConfig("show_lockScreen", false)

var bottomPanelSeparatorRight = bottomPanel.addWidget("org.kde.plasma.panelspacer")
bottomPanelSeparatorRight.writeConfig("expanding", false)
bottomPanelSeparatorRight.writeConfig("length", "10")
