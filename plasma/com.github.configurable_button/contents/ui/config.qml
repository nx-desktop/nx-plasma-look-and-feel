/*
 * Copyright (C) 2019 by Piotr Markiewicz p.marki@wp.pl
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
import QtQuick.Controls 2.2

Item {
    id: configPage

    property alias cfg_onScriptEnabled: onScriptEnabledBox.checked
    property alias cfg_onScript: onScriptText.text
    property alias cfg_offScriptEnabled: offScriptEnabledBox.checked
    property alias cfg_offScript: offScriptText.text
    property alias cfg_statusScriptEnabled: statusScriptEnabledBox.checked
    property alias cfg_statusScript: checkStatusScriptText.text
    property alias cfg_runStatusOnStart: runStatusScriptBox.checked
    property alias cfg_updateInterval: updateIntervalSpinBox.value
    property alias cfg_updateIntervalUnit: updateIntervalUnitSpinBox.value
    property string cfg_iconOn: plasmoid.configuration.iconOn
    property string cfg_iconOff: plasmoid.configuration.iconOff
    property alias cfg_commandName: commandNameText.text
    
    function setInterval() {
        if (updateIntervalUnitSpinBox.value == 1) {
            plasmoid.configuration.interval = updateIntervalSpinBox.value * 60;
        } else if (updateIntervalUnitSpinBox.value == 2) {
            plasmoid.configuration.interval = updateIntervalSpinBox.value * 60 * 60;
        } else {
            plasmoid.configuration.interval = updateIntervalSpinBox.value;   
        }
    }
    
    ColumnLayout {
        GridLayout {
            columns: 2
            Label {
                Layout.row :0
                Layout.column: 0
                text: i18n("Plasmoid label")
            }
            TextField {
                Layout.row: 0
                Layout.column: 1
                id: commandNameText
                Layout.minimumWidth: 300
            }
            Label {
                Layout.row: 1
                Layout.column: 0
                text: i18n("On-Script")
                font.weight: Font.Bold
            }
            CheckBox {
                Layout.row: 1
                Layout.column: 1
                id: onScriptEnabledBox
                checked: onScriptText.activeFocus || onScriptText.length
                text: i18n("Run when clicked")
                
                onClicked: if (checked) onScriptText.forceActiveFocus();
            }
            Label {
                Layout.row: 2
                Layout.column: 0
                text: i18n("Script")
            }
            TextField {
                Layout.row: 2
                Layout.column: 1
                id: onScriptText
                Layout.minimumWidth: 300
                enabled: onScriptEnabledBox.checked
            }
            Label {
                Layout.row: 3
                Layout.column: 0
                text: i18n("Icon")
            }
            IconPicker {
                Layout.row: 3
                Layout.column: 1
                currentIcon: cfg_iconOn
                defaultIcon: "security-high"
                    onIconChanged: cfg_iconOn = iconName
                    enabled: true
            }
 
            Label {
                Layout.row: 4
                Layout.column: 0
                text: i18n("Off-Script")
                font.weight: Font.Bold
            }
            CheckBox {
                Layout.row: 4
                Layout.column: 1
                id: offScriptEnabledBox
                checked: offScriptText.activeFocus || offScriptText.length
                text: i18n("Run when clicked")
                
                onClicked: if (checked) offScriptText.forceActiveFocus();
            }
            Label {
                Layout.row: 5
                Layout.column: 0
                text: i18n("Script")
            }
            TextField {
                Layout.row: 5
                Layout.column: 1
                id: offScriptText
                Layout.minimumWidth: 300
                enabled: offScriptEnabledBox.checked
            }
            Label {
                Layout.row: 6
                Layout.column: 0
                text: i18n("Icon")
            }
            IconPicker {
                Layout.row: 6
                Layout.column: 1
                currentIcon: cfg_iconOff
                defaultIcon: "security-high"
                    onIconChanged: cfg_iconOff = iconName
                    enabled: true
            }
            
            Label {
                Layout.row: 7
                Layout.column: 0
                text: i18n("Status script")
                font.weight: Font.Bold
            }
            CheckBox {
                Layout.row: 7
                Layout.column: 1
                id: statusScriptEnabledBox
                checked: checkStatusScriptText.activeFocus || checkStatusScriptText.length
                text: i18n("Run periodically")
                
                onClicked: if (checked) checkStatusScriptText.forceActiveFocus();
            }
            
            Label {
                Layout.row: 8
                Layout.column: 0
                text: i18n("Script")
            }
            TextField {
                Layout.row: 8
                Layout.column: 1
                id: checkStatusScriptText
                Layout.minimumWidth: 300
                enabled: statusScriptEnabledBox.checked
            }
            
            Label {
                Layout.row: 9
                Layout.column: 0
                text: i18n("Run every")
            }
            GridLayout {
                columns: 2
                Layout.row: 9
                Layout.column: 1
                SpinBox {
                    Layout.row: 0
                    Layout.column: 0
                    id: updateIntervalSpinBox
                    enabled: statusScriptEnabledBox.checked
                    stepSize: 1
                    from: 1
                    onValueModified: setInterval()
                }
                SpinBox {
                    Layout.row: 0
                    Layout.column: 1
                    id: updateIntervalUnitSpinBox
                    enabled: statusScriptEnabledBox.checked
                    from: 0
                    to: items.length - 1
                    onValueModified: setInterval()
                    
                    property var items: ["s", "min", "h"]
                    
                    validator: RegExpValidator {
                        regExp: new RegExp("(s|min|h)", "i")
                    }
                    
                    textFromValue: function(value) {
                        return items[value];
                    }
                    
                    valueFromText: function(text) {
                        for (var i = 0; i < items.length; ++i) {
                            if (items[i].toLowerCase().indexOf(text.toLowerCase()) === 0)
                                return i
                        }
                        return sb.value
                    }
                }
            }
            CheckBox {
                Layout.row: 10
                Layout.column: 1
                id: runStatusScriptBox
                text: i18n("Check status on startup")
            }

        }   
    }
}
