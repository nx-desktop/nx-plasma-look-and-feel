/*
 *  Copyright 2018 Rog131 <samrog131@hotmail.com>
 *  Copyright 2019 adhe   <adhemarks2@gmail.com>
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
import QtQuick 2.7

import org.kde.plasma.core 2.0 as Plasmacore

Item {
    anchors.fill: parent

/* Using loader as the plasma will crash if trying to change the video source on the fly.
 * Not crashing if setting the loader inactive and then again active */

    Loader { 
        id: mediaPlayerLoader
        anchors.fill: parent
    }

    Timer {
        id: smoother
        interval: 100
        onTriggered:  mediaPlayerLoader.source = "mediaplayer/player.qml"
    }
    
    Component.onCompleted: {
        //mediaPlayerLoader.source = "mediaplayer/loading.qml"
        reLoad ()
        smoother.start()
    }
    
    function reLoad() {
        mediaPlayerLoader.active = false
        mediaPlayerLoader.active = true
    }
}
