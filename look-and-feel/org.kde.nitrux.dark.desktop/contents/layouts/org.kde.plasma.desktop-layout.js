
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   The license used for this file and its contents is: BSD-3-Clause                                                                                                        /
//                                                                                                                                                                           /
//   Copyright <2023> <Uri Herrera <uri_herrera@nxos.org>>                                                                                                                   /
//                                                                                                                                                                          /
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set Plasma Desktop Scripting API.
var plasma = getApiVersion(1)

// Set desktop activities.
var activity = desktopById(activityId)

// Remove desktop toolbox.
activity.currentConfigGroup = ["General"]
activity.writeConfig("showToolbox", false)

// Set wallpaper plugin.
var desktopsArray = desktopsForActivity(currentActivity());
for( var j = 0; j < desktopsArray.length; j++) {
    desktopsArray[j].wallpaperPlugin = 'a2n.blur';
}

// Top panel.
menuPanel = new plasma.Panel
var menuPanelScreen = menuPanel.screen
menuPanel.location = "top"
menuPanel.alignment = "center"
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
var windowButtons = menuPanel.addWidget("org.kde.windowButtons")
windowButtons.currentConfigGroup = ["Configuration", "General"]
windowButtons.writeConfig("buttonSizePercentage", "75")
windowButtons.writeConfig("hiddenState", "EmptySpace")
windowButtons.writeConfig("inactiveStateEnabled", "EmptySpace")
windowButtons.writeConfig("lengthFirstMargin", "4")
windowButtons.writeConfig("lengthLastMargin", "4")
windowButtons.writeConfig("visibility", "3")

var latteSeparatorTop1 = menuPanel.addWidget("org.kde.latte.separator")
latteSeparatorTop1.currentConfigGroup = ["Configuration", "General"]
latteSeparatorTop1.writeConfig("lengthMargin", "10")
latteSeparatorTop1.writeConfig("thickMargin", "6")

var windowTitle = menuPanel.addWidget("org.kde.windowTitle")
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

// Bottom panel (Dock).
var bottomPanel = new plasma.Panel
bottomPanel.location = "bottom"
bottomPanel.alignment = "center"
bottomPanel.height = 2 * Math.floor(gridUnit * 2.5 / 2)

