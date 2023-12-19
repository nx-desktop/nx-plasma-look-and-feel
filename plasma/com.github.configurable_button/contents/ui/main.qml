/*
 * Copyright (C) 2019 by Piotr Markiewicz p.marki@wp.pl>
 * 
 * Credits to Norbert Eicker <norbert.eicker@gmx.de>
 * https://github.com/neicker/on-off-switch
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation;
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>
 */
import QtQuick 2.2
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.4
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 2.0 as PlasmaComponents

Item {
    id: root
    property bool onScriptEnabled: Plasmoid.configuration.onScriptEnabled
    property string onScript: Plasmoid.configuration.onScript
    property bool offScriptEnabled: Plasmoid.configuration.offScriptEnabled
    property string offScript: Plasmoid.configuration.offScript
    property bool statusScriptEnabled: Plasmoid.configuration.statusScriptEnabled
    property string checkStatusScript: Plasmoid.configuration.statusScript
    property bool runStatusScriptOnStart: Plasmoid.configuration.runStatusOnStart
    property int statusInterval: Plasmoid.configuration.interval
    property string commandName: Plasmoid.configuration.commandName
    
    //Store state of the button
    property bool checked: false
    //When script is running pause status check script
    property bool scriptRunning: false
    
    Plasmoid.preferredRepresentation: Plasmoid.compactRepresentation
    
    onStatusIntervalChanged: {
        console.log('* Interval changed: ' +statusInterval);
        checkStatusTimer.interval = statusInterval * 1000;
    }
    
    onStatusScriptEnabledChanged: {
        if (statusScriptEnabled) {
            checkStatusTimer.start(); 
        } else {
            checkStatusTimer.stop();
        }
    }
    
    Component.onCompleted: {
        if (runStatusScriptOnStart) {
            checkStatus()
            if (statusScriptEnabled) {
                checkStatusTimer.start(); 
            }
        }
    }
 
    PlasmaCore.DataSource {
        id: executable
        engine: "executable"
        connectedSources: []
        onNewData: { 
            if (!scriptRunning) {
                //Behaviour for status script:
                if (data['exit code'] != 0) {
                    checked = false;
                } else {
                    checked = true;
                }
            } else {
                //behaviour for button pressed scripts
                if (checked && data['exit code'] != 0) {
                    checked = false;
                }
                scriptRunning = false;
                
                if (statusScriptEnabled) {
                    checkStatusTimer.restart();
                }
                
            }
            
            disconnectSource(sourceName)
        }
        
        function exec(cmd) {
            connectSource(cmd)
        }
    }
    
    function toggleAction() {
        checkStatusTimer.stop();
        scriptRunning = true;
        
        if (checked) {
            executable.exec(onScript);
        } else {
            executable.exec(offScript);
        }
    }
    
    function checkStatus() {
        executable.exec(checkStatusScript);
    }
    
    Plasmoid.compactRepresentation: RowLayout {
        id: mainItem
        spacing: 0
        PlasmaComponents.Label {
            id: commandNameLabel
            text: commandName
        }
        Item {
            Layout.fillWidth: true
        }
        PlasmaCore.IconItem {
            id: icon
            Layout.fillHeight: true
            Layout.fillWidth: true
            source: checked ? plasmoid.configuration.iconOn : plasmoid.configuration.iconOff
            MouseArea {
                id: mouseArea
                anchors.fill: parent
                hoverEnabled: true
                onClicked: {
                    if ((checked && offScriptEnabled) || (!checked && onScriptEnabled)) {
                        checked = checked == true ? false : true
                        toggleAction();
                    }
                }
            }
            BusyIndicator {
                id: busy
                anchors.fill:parent
                visible: scriptRunning
            }
        }
    }
    Timer {
        id: checkStatusTimer
        interval: statusInterval
        running: false
        repeat: true
        triggeredOnStart: false
        onTriggered: {
            checkStatus();
        }
    }
}
