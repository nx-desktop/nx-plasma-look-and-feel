﻿/*
 *  Copyright 2015 Kai Uwe Broulik <kde@privat.broulik.de>
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  2.010-1301, USA.
 */

import QtQuick 2.2
import QtQuick.Layouts 1.1

import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 2.0 as PlasmaComponents

Item {
    id: item

    signal clicked
    signal iconClicked

    property alias text: label.text
    // property alias subText: sublabel.text
    property alias icon: icon.source
    // "enabled" also affects all children
    property bool interactive: true
    property bool interactiveIcon: false

    property alias usesPlasmaTheme: icon.usesPlasmaTheme

    property alias containsMouse: area.containsMouse
    property alias size: icon.height

    property Item highlight

    height: size + 2 * units.smallSpacing
    width: height

    MouseArea {
        id: area
        anchors.fill: parent
        enabled: item.interactive
        hoverEnabled: true
        onClicked: item.clicked()
    }

    PlasmaCore.IconItem {
        id: icon
        width: icon.height
        anchors.centerIn: parent
        usesPlasmaTheme: true
        MouseArea {
            anchors.fill: parent
            visible: item.interactiveIcon
            cursorShape: Qt.PointingHandCursor
            onClicked: item.iconClicked()
        }
    }

    PlasmaCore.ToolTipArea {
        id: toolTip
        property string text: label.text
        anchors.fill: parent
        active: root.visible //&& label.truncated
        mainItem: toolTipDelegate
        onContainsMouseChanged: {
            if (!highlight) {
                return
            }
            if (containsMouse) {
                highlight.parent = item
                highlight.width = item.width
                highlight.height = item.height

            }
            highlight.visible = containsMouse
        }
    }

    ColumnLayout {
        Layout.fillWidth: true
        spacing: 0
        visible: false

        PlasmaComponents.Label {
            id: label
            Layout.fillWidth: true
            wrapMode: Text.NoWrap
            elide: Text.ElideRight
        }
    }

}
