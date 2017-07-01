import QtQuick 2.5
import QtQuick.Controls 1.1
import QtQuick.Controls.Styles 1.4
import QtGraphicalEffects 1.0

import QtQuick.Layouts 1.1

import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 2.0 as PlasmaComponents

import org.kde.plasma.private.sessions 2.0
import "../components"

Rectangle {
    id: lockScreenRoot

    //colorGroup: PlasmaCore.Theme.ComplementaryColorGroup

    color: "#4c5256"
    Connections {
        target: authenticator
        onFailed: {
            root.notification = i18nd("plasma_lookandfeel_org.kde.lookandfeel",
                                      "Unlocking failed")
        }
        onGraceLockedChanged: {
            if (!authenticator.graceLocked) {
                root.notification = ""
                root.clearPassword()
            }
        }
        onMessage: {
            root.notification = msg
        }
        onError: {
            root.notification = err
        }
    }

    SessionsModel {
        id: sessionsModel
        showNewSessionEntry: true
    }

    PlasmaCore.DataSource {
        id: keystateSource
        engine: "keystate"
        connectedSources: "Caps Lock"
    }

    Rectangle {
        id: actionBar
        anchors.top: parent.top;
        color: "#3a3f41"
        opacity: 0.9
        anchors.horizontalCenter: parent.horizontalCenter
        width: parent.width; height: 32

        // Clock
        Row {
            height: parent.height
            anchors.right: parent.right
            anchors.margins: 9
            spacing: 5

            InlineClock {
                color: "#F5F5F5"
                font.pointSize: 10
                font.weight: Font.Bold
            }
        }
        
        DropShadow {
            anchors.fill: actionBar
            horizontalOffset: 0
            verticalOffset: 2
            cached: true
            radius: 8.0
            samples: 15
            color: "#33000000"
            source: actionBar
        }
    }
    

    Clock {
        id: clock
        anchors.bottom: parent.verticalCenter
        anchors.bottomMargin: units.gridUnit * - 1
        anchors.horizontalCenter: parent.horizontalCenter
    }

    ColumnLayout {
        id: mainBlock
        spacing: 18
        width: 200
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: clock.bottom
        anchors.topMargin: 18

        property bool locked: true


        Loader {
            id: passwordAreaLoader
            Layout.fillWidth: true
            sourceComponent: mainBlock.locked ? undefined : passwordArea
            height: 0;
            clip: true

            NumberAnimation on height {
                id: showPasswordArea
                from: 0
                to: loginButton.height
                // duration: 500
            }
        }

        PlasmaCore.ColorScope {
            Layout.alignment: Qt.AlignHCenter
            implicitHeight: loginButton.implicitHeight
            implicitWidth: loginButton.implicitWidth

            colorGroup: PlasmaCore.Theme.ComplementaryColorGroup


            PlasmaComponents.Button {
                id: loginButton
                focus: true
                text: !authenticator.graceLocked ? i18nd(
                                                       "plasma_lookandfeel_org.kde.lookandfeel",
                                                       "Unlock") : i18nd(
                                                       "plasma_lookandfeel_org.kde.lookandfeel",
                                                       "Authenticating...")
                enabled: !authenticator.graceLocked
                onClicked: {
                    if (mainBlock.locked) {
                        showPasswordArea.start()
                        mainBlock.locked = false
                        passwordAreaLoader.item.forceActiveFocus()
                    } else
                        authenticator.tryUnlock(passwordAreaLoader.item.password)
                }

                Keys.onPressed: {
                    if (mainBlock.locked) {
                        showPasswordArea.start()
                        mainBlock.locked = false
                        root.clearPassword()
                    }
                }
            }
        }
    }

    Component {
        id: passwordArea

        PlasmaComponents.TextField {
            id: passwordBox
            property alias password: passwordBox.text

            // placeholderText: i18nd("plasma_lookandfeel_org.kde.lookandfeel", "Password")
            focus: true
            echoMode: TextInput.Password
            enabled: !authenticator.graceLocked

            onAccepted: authenticator.tryUnlock(passwordBox.text)

            Connections {
                target: root
                onClearPassword: {
                    passwordBox.forceActiveFocus()
                    passwordBox.selectAll()
                }
            }

            Text {
                anchors.centerIn: parent
                opacity: 0.6
                visible: passwordBox.text == ""
                color: theme.viewTextColor
                text: i18nd("plasma_lookandfeel_org.kde.lookandfeel",
                            "Password")
            }

            Keys.onPressed: {
                if (event.key == Qt.Key_Escape) {
                    root.clearPassword()
                }

            }
        }
    }


    Component.onCompleted: {
        // version support checks
        if (root.interfaceVersion < 1) {
            // ksmserver of 5.4, with greeter of 5.5
            root.viewVisible = true
        }
    }
}
