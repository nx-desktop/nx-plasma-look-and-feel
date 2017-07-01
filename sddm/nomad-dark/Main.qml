/***************************************************************************
* Copyright (c) 2015 Mikkel Oscar Lyderik <mikkeloscar@gmail.com>
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge,
* publish, distribute, sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
* OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
* OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
* OR OTHER DEALINGS IN THE SOFTWARE.
*
***************************************************************************/

import QtQuick 2.0
import QtGraphicalEffects 1.0
import SddmComponents 2.0
import QtQuick.Layouts 1.3

import org.kde.plasma.components 2.0 as PlasmaComponents

import "Components"

Rectangle {
    id: container

    LayoutMirroring.enabled: Qt.locale().textDirection == Qt.RightToLeft
    LayoutMirroring.childrenInherit: true

    property int sessionIndex: session.index

    TextConstants { id: textConstants }

    Connections {
        target: sddm

        onLoginSucceeded: {
        }

        onLoginFailed: {
            errorMessage.text = textConstants.loginFailed
            password.text = ""
        }
    }


    Background {
        id: background
        anchors.fill: parent
        source: config.background
        fillMode: Image.PreserveAspectCrop
        onStatusChanged: {
            if (status == Image.Error && source != config.defaultBackground) {
                source = config.defaultBackground
            }
        }
    }

    DirectionalBlur {
        anchors.fill: background
        source: background
        angle: 90
        length: 32
        samples: 24
    }

    ColorOverlay {
        anchors.fill: background
        source: background
        color: "#f5f5f5"
        opacity: 0.1
    }

    Rectangle {
        anchors.bottom: parent.bottom
        anchors.horizontalCenter: parent.horizontalCenter
        width: 200
        height: 120
        color: "transparent"
        visible: primaryScreen

        Column {
            id: rebootColumn
            spacing: 5

            ImageButton {
                id: btnReboot
                anchors.horizontalCenter: parent.horizontalCenter
                width: 64
                source: "system-reboot.svg"

//                 visible: sddm.canReboot

                onClicked: sddm.reboot()

                KeyNavigation.backtab: loginButton; KeyNavigation.tab: btnPoweroff
            }

            Text {
                text: "Reboot"
                color: "#F5F5F5"
                anchors.horizontalCenter: parent.horizontalCenter
            }
        }

        Column {
            id: poweroffColumn
            spacing: 5
            anchors.right: parent.right

            ImageButton {
                id: btnPoweroff
                anchors.horizontalCenter: parent.horizontalCenter
                width: 64
                source: "system-shutdown.svg"

//                 visible: sddm.canPowerOff

                onClicked: sddm.powerOff()

                KeyNavigation.backtab: btnReboot; KeyNavigation.tab: session
            }

            Text {
                text: "Shutdown"
                color: "#F5F5F5"
                anchors.horizontalCenter: parent.horizontalCenter
            }
        }
    }

    Rectangle {
        id: loginArea
        anchors.fill: parent
        color: "transparent"
        visible: primaryScreen

        Column {
         id: mainColumn
         anchors.centerIn: parent
         anchors.verticalCenterOffset: -100
         spacing: 12
         
            Image {
                id: space1
                width: 100
                height: 100
                fillMode: Image.PreserveAspectFit
                source: "blank_space.svg"
            }

            Image {
                id: logo
                width: 262
                height: 128
                fillMode: Image.PreserveAspectFit
                source: config.logo
            }
            
//            Image {
//                id: space2
//                width: 100
//                height: 32
//                fillMode: Image.PreserveAspectFit
//                source: "blank_space.svg"
//            }

            Text {
                id: statusText
                anchors.horizontalCenter: mainColumn.horizontalCenter
                anchors.bottomMargin: 12
                text: i18n("Hi there, Welcome back!")

            }

            TextBox {
                id: name
                width: 256
                height: 32
                text: rememberLastUser.checked ? userModel.lastUser : ""
                font.pixelSize: 12
                radius: 3
                color: "#3a3f41"
                borderColor: "#c3c9d6"
                focusColor: "#f5f5f5"
                textColor: "#263238"

                KeyNavigation.backtab: layoutBox; KeyNavigation.tab: password
                
                Text {
                    id: userNotice
                    text: "Username"
                    color: "#808080"
                    anchors {
                        horizontalCenter: parent.horizontalCenter
                        verticalCenter: parent.verticalCenter
                    }
                    visible: name.text == "";
                    font.pointSize: 9
                }
                
            }

            PasswordBox {
                id: password
                width: 256
                height: 32
                font.pixelSize: 12
                radius: 3
                color: "#3a3f41"
                borderColor: "#c3c9d6"
                focusColor: "#f5f5f5"
                textColor: "#263238"
                focus: true
                
                Text {
                    id: passwordNotice
                    text: "Password"
                    color: "#808080"
                    anchors {
                        horizontalCenter: parent.horizontalCenter
                        verticalCenter: parent.verticalCenter


                    }
                    visible: password.text == "";
                    font.pointSize: 9
                }
                
                Timer {
                    interval: 200
                    running: true
                    onTriggered: password.forceActiveFocus()
                }

                KeyNavigation.backtab: name; KeyNavigation.tab: rememberLastUser

                Keys.onPressed: {
                    if (event.key === Qt.Key_Return || event.key ===
                            Qt.Key_Enter) {
                            sddm.login(name.text, password.text, session.index)
                            event.accepted = true
                    }
                }
            }


            RowLayout {
                visible: false
                LayoutMirroring.enabled: true
                LayoutMirroring.childrenInherit: true
                anchors.horizontalCenter: parent.horizontalCenter

                CustomCheckBox {
                    id: rememberLastUser
                    height: 36
                    text: qsTr("Remember last User")

                    checked: config.rememberLastUser === "true"
                    onCheckedChanged: checked ? config.rememberLastUser = "true" : config.rememberLastUser = "false"


                    KeyNavigation.backtab: passwordNotice; KeyNavigation.tab: loginButton
                }

            }

            PlasmaComponents.Button {
                id: loginButton
                text: textConstants.login
                anchors.horizontalCenter:  mainColumn.horizontalCenter
                width: 150
                height: 32
                onClicked: sddm.login(name.text, password.text, session.index)

                KeyNavigation.backtab: rememberLastUser; KeyNavigation.tab: btnReboot
            }

            Text {
                id: errorMessage
                anchors.horizontalCenter: parent.horizontalCenter
                text: " "
                font.pixelSize: 12
            }
        }
    }

    Rectangle {
        id: actionBar
        z: 1
        anchors.top: parent.top;
        color: "#3a3f41"
        opacity: 0.9
        anchors.horizontalCenter: parent.horizontalCenter
        width: parent.width; height: 32
        visible: primaryScreen

        Row {
            anchors.left: parent.left
            anchors.margins: 5
            anchors.verticalCenter: parent.verticalCenter
            height: 24
            spacing: 20

            // Session
            CustomComboBox {
                id: session
                height: parent.height
                arrowColor: "#F5F5F5"
                textColor: "#F5F5F5"
                width: 120
                anchors.verticalCenter: parent.verticalCenter

                arrowIcon: "angle-down.svg"

                model: sessionModel
                index: sessionModel.lastIndex

                font.family: "Noto Sans"
                font.pointSize: 10
                font.weight: Font.ExtraLight

                KeyNavigation.backtab: btnPoweroff; KeyNavigation.tab: layoutBox
            }

            // Keyboard Layout
            CustomLayoutBox {
                id: layoutBox
                height: session.height
                disableFlag: true
                arrowColor: "#F5F5F5"
                textColor: "#F5F5F5"
                anchors.verticalCenter: parent.verticalCenter

                arrowIcon: "angle-down.svg"

                KeyNavigation.backtab: session; KeyNavigation.tab: name
            }
        }

        // Clock
        Row {
            height: 24
            anchors.right: parent.right
            anchors.verticalCenter: parent.verticalCenter
            anchors.margins: 9
            spacing: 5

            InlineClock {
                color: "#F5F5F5"
                font.pointSize: 12
            }
        }
    }

    DropShadow {
        anchors.fill: actionBar
        horizontalOffset: 0
        verticalOffset: 2
        radius: 8
        spread: 0
        samples: 17
        color: "#333333"
        source: actionBar
    }
}
