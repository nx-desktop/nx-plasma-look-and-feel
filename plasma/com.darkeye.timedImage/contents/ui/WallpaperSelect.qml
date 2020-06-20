/*
 * Copyright (c) 2019, Eran <darkeye@librem.one>
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *     * Neither the name of the <organization> nor the
 *     names of its contributors may be used to endorse or promote products
 *     derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY Eran <darkeye@librem.one> ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Eran <darkeye@librem.one> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import QtQuick 2.9
import org.kde.plasma.core 2.0 as PlasmaCore
import QtGraphicalEffects 1.0
import QtQuick.Controls 2.9 as QtControls
import QtQuick.Dialogs 1.1 as QtDialogs
import org.kde.kcm 1.1 as KCM

Item {
     Loader {
        anchors.fill:parent
        asynchronous: true
        sourceComponent: wallpaperGridComp
    }
     Component {
         id:wallpaperGridComp
         KCM.GridView {
             id: wallpapersGrid
             anchors.fill: parent
             view.model: imageWallpaper.wallpaperModel
             
             view.currentIndex:  Math.min(imageWallpaper.wallpaperModel.indexOf(cfg_Image), imageWallpaper.wallpaperModel.count-1)
             focus: true
             
             anchors.margins: 4
             
             view.delegate: WallpaperDelegate {
                 color: cfg_Color
             }
         }
     }
}
