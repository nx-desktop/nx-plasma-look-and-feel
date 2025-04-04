import QtQuick 2.0
import QtQuick.Layouts 1.0
import QtQuick.Controls 2.0
import org.kde.plasma.components 3.0 as PlasmaComponents3
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.plasmoid 2.0

/*
*
* Notes: 
* Peculiar behavior of EnvyControl: Starting from integrated mode, and trying to switch directly to nvidia mode,
* an error occurs. It is because you need to switch to hybrid mode first, reboot, and then switch to nvidia mode. When
* this happens, EnvyControl automatically switches to hybrid mode without warning, so all that remains is to restart.
* I don't know if this behavior occurs on all platforms.
*
* The "envycontrol -s nvidia" command is executed using a wrapper script "overlay-envycontrol", which ensures proper
* privilege escalation and execution within "overlayroot-chroot". This avoids issues with "pkexec" losing environment variables.
*
*/

Item {
    id: root

    property string const_IMAGE_ERROR: Qt.resolvedUrl("./image/error.png")

    // Keep notifications open because EnvyControl operations can take several seconds to complete.
    // This option is only valid for the notify-send tool.
    property string const_ZERO_TIMEOUT_NOTIFICATION: " -t 0"

    // GPU modes available for the EnvyControl tool.
    property var const_GPU_MODES: ["integrated", "nvidia", "hybrid"]

    // Defined in findNotificationTool Connection. Possible values are "zenity" and "notify-send"
    property string notificationTool: ""


    // These values will surely change after executing the setupCPUManufacturer() function
    property string imageIntegrated: Qt.resolvedUrl("./image/integrated.png")
    property string imageHybrid: Qt.resolvedUrl("./image/hybrid.png")

    property var icons: ({
        "integrated": imageIntegrated,
        "nvidia": Qt.resolvedUrl("./image/nvidia.png"),
        "hybrid": imageHybrid
    })

    // Whether or not the EnvyControl tool is installed. Assume by default that it is installed, however it is checked in onCompleted().
    property bool envycontrol: true

    // currentGPUMode: The default is "integrated". However, upon completing the initialization of the widget, the current mode is checked and this variable is updated.
    property string currentGPUMode: const_GPU_MODES[0]
    // desiredGPUMode: The mode the user wants to switch to. It stays in sync with the combobox and is useful for detecting and handling errors.
    property string desiredGPUMode: const_GPU_MODES[0]
    // pendingRebootGPUMode: Mode that was successfully changed to, generally matches the variable desiredGPUMode, except in case of errors.
    property string pendingRebootGPUMode

    // To show or hide the loading indicator, also to prevent the use of any feature while changing modes.
    property bool loading: false

    property string icon: root.icons[root.currentGPUMode]
    Plasmoid.icon: root.icon

    Component.onCompleted: {
        findNotificationTool()
        setupCPUManufacturer()
        queryMode()
    }



    // Try to find out the manufacturer of the CPU to use an appropriate icon.
    function setupCPUManufacturer() {
        cpuManufacturerDataSource.exec()
    }

    function queryMode() {
        root.loading = true
        envyControlQueryModeDataSource.exec()
    }

    function switchMode(mode: string) {
        root.desiredGPUMode = mode
        root.loading = true

        showNotification(root.icons[mode], i18n("Switching to %1 GPU mode, please wait.", mode))

        envyControlSetModeDataSource.mode = mode
        envyControlSetModeDataSource.exec()
    }

    function showNotification(iconURL: string, message: string, title = "Optimus GPU Switcher", options = const_ZERO_TIMEOUT_NOTIFICATION){
        sendNotification.tool = root.notificationTool

        sendNotification.iconURL= iconURL
        sendNotification.title= title
        sendNotification.message= message
        sendNotification.options= options

        sendNotification.exec()
    }

    function findNotificationTool() {
        findNotificationToolDataSource.exec()
    }


    CustomDataSource {
        id: envyControlQueryModeDataSource
        command: plasmoid.configuration.envyControlQueryCommand
    }

    CustomDataSource {
        id: envyControlSetModeDataSource

        /* Dynamically set in switchMode(). Set a default value to avoid errors at startup. */
        property string mode: "integrated"

        /* Use plasmoid.configuration.envyControlSetCommand instead of hardcoding */
        property string baseCommand: plasmoid.configuration.envyControlSetCommand
        property var cmds: {
            "integrated": `${baseCommand} integrated`,
            "nvidia": `${baseCommand} nvidia ${plasmoid.configuration.envyControlSetNvidiaOptions}`,
            "hybrid": `${baseCommand} hybrid ${plasmoid.configuration.envyControlSetHybridOptions}`
        }

        command: cmds[mode]
    }

    CustomDataSource {
        id: cpuManufacturerDataSource
        command: "lscpu | grep \"GenuineIntel\\|AuthenticAMD\""
    }

    CustomDataSource {
        id: findNotificationToolDataSource
        command: "find /usr -type f -executable \\( -name \"notify-send\" -o -name \"zenity\" \\)"
    }

    CustomDataSource {
        id: sendNotification

        // Dynamically set in showNotification(). Set a default value to avoid errors at startup.
        property string tool: "notify-send"

        property string iconURL: ""
        property string title: ""
        property string message: ""
        property string options: ""

        property var cmds: {
            "notify-send": `notify-send -a '${title}' -i ${iconURL} ${options} '${title}' '${message}'`,
            "zenity": `zenity --notification --text='${title}\\n${message}'`
        }

        command: cmds[tool]
    }


    Connections {
        target: envyControlQueryModeDataSource
        function onExited(exitCode, exitStatus, stdout, stderr){
            if (stderr) {
                root.envycontrol = false
                root.icon = const_IMAGE_ERROR

                showNotification(const_IMAGE_ERROR, stderr + " \n " + stderr)

            } else {
                var mode = stdout.trim()

                /*
                * Check if there was an attempt to change the GPU mode and something went wrong.
                * Perhaps in the process, EnviControl switched to another mode automatically without warning.
                */
                if(root.currentGPUMode !== root.desiredGPUMode && root.currentGPUMode !== mode){
                    root.pendingRebootGPUMode = mode
                    showNotification(root.icons[mode], i18n("A change to %1 mode was detected. Please reboot!", mode))
                }else{
                    root.currentGPUMode = mode
                }

                root.desiredGPUMode = mode
                root.loading = false
            }
        }
    }


    Connections {
        target: envyControlSetModeDataSource
        function onExited(exitCode, exitStatus, stdout, stderr) {
            root.loading = false

            if (exitCode !== 0) {
                showNotification(const_IMAGE_ERROR, i18n("Error: GPU mode change failed.\n%1", stderr || stdout));
                root.desiredGPUMode = root.currentGPUMode;
            } else {
                showNotification(root.icons[root.desiredGPUMode], i18n("Successfully switched to %1 mode.", root.desiredGPUMode.toUpperCase()));

                queryMode(); /* Update current mode */

                if (root.desiredGPUMode !== root.currentGPUMode) {
                    root.pendingRebootGPUMode = root.desiredGPUMode;
                    showNotification(root.icons[root.desiredGPUMode], i18n("Switched to %1 mode.\nA reboot is required.", root.desiredGPUMode.toUpperCase()));
                } else {
                    root.pendingRebootGPUMode = "";
                    showNotification(root.icons[root.desiredGPUMode], i18n("You have switched back to the current mode."));
                }
            }
        }
    }


    Connections {
        target: cpuManufacturerDataSource
        function onExited(exitCode, exitStatus, stdout, stderr){
            root.loading = false

            if (stderr) {
                showNotification(const_IMAGE_ERROR, stderr + " \n " + stdout)
            } else {
                var amdRegex = new RegExp("AuthenticAMD")
                var intelRegex = new RegExp("GenuineIntel")

                if(amdRegex.test(stdout)){
                    root.imageHybrid = Qt.resolvedUrl("./image/hybrid-amd.png")
                    root.imageIntegrated = Qt.resolvedUrl("./image/integrated-amd.png")
                }else if(intelRegex.test(stdout)){
                    root.imageHybrid = Qt.resolvedUrl("./image/hybrid-intel.png")
                    root.imageIntegrated = Qt.resolvedUrl("./image/integrated-intel.png")
                }
            }
        }
    }


    Connections {
        target: findNotificationToolDataSource
        function onExited(exitCode, exitStatus, stdout, stderr){

            if (stdout) {
                var paths = stdout.split("\n")
                var path1 = paths[0]
                var path2 = paths[1]

                /*
                * Prefer notify-send because it allows to use a custom icon and timeout.
                * Zenity v3.44.0 does not accept icon option and no version allows you to avoid the automatic closing of notifications.
                */
                if (path1 && path1.trim().endsWith("notify-send")) {
                    root.notificationTool = "notify-send"
                } else if (path2 && path2.trim().endsWith("notify-send")) {
                    root.notificationTool = "notify-send"
                } else if (path1 && path1.trim().endsWith("zenity")) {
                    root.notificationTool = "zenity"
                } else {
                    console.warn("No compatible notification tool found.")
                }
            }
        }
    }


    Plasmoid.preferredRepresentation: Plasmoid.compactRepresentation

    Plasmoid.compactRepresentation: Item {
        PlasmaCore.IconItem {
            height: plasmoid.configuration.iconSize
            width: plasmoid.configuration.iconSize
            anchors.centerIn: parent

            source: root.icon
            active: compactMouse.containsMouse

            MouseArea {
                id: compactMouse
                anchors.fill: parent
                hoverEnabled: true
                onClicked: {
                    plasmoid.expanded = !plasmoid.expanded
                }
            }
        }
    }

    Plasmoid.fullRepresentation: Item {
        Layout.preferredWidth: 400 * PlasmaCore.Units.devicePixelRatio
        Layout.preferredHeight: 300 * PlasmaCore.Units.devicePixelRatio

        ColumnLayout {
            anchors.centerIn: parent

            Image {
                id: mode_image
                source: root.icon
                Layout.alignment: Qt.AlignCenter
                Layout.preferredHeight: 64
                fillMode: Image.PreserveAspectFit
            }


            PlasmaComponents3.Label {
                Layout.alignment: Qt.AlignCenter
                text: root.envycontrol ? i18n("%1 currently in use.", root.currentGPUMode.toUpperCase()) : i18n("EnvyControl is not working.")
            }

            PlasmaComponents3.Label {
                Layout.alignment: Qt.AlignCenter
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
                visible: root.pendingRebootGPUMode && !root.loading
                color: "red"
                text: i18n("Switched to:" + " " + root.pendingRebootGPUMode.toUpperCase()) + "\n" + i18n("Please reboot your computer for changes to take effect.")
            }

            PlasmaComponents3.Label {
                Layout.topMargin: 10
                text: i18n("Change mode:")
                Layout.alignment: Qt.AlignCenter
            }


            PlasmaComponents3.ComboBox {
                Layout.alignment: Qt.AlignCenter

                enabled: !root.loading && root.envycontrol
                model: const_GPU_MODES
                currentIndex: model.indexOf(root.desiredGPUMode)

                onCurrentIndexChanged: {
                    // Avoid redundant execution if the user selects the current mode.
                    if (model[currentIndex] !== root.currentGPUMode) {
                        switchMode(model[currentIndex])
                    }
                }
            }


            PlasmaComponents3.Button {
                Layout.alignment: Qt.AlignCenter
                icon.name: "view-refresh-symbolic"
                text: i18n("Refresh")
                onClicked: queryMode()
                enabled: !root.loading && root.envycontrol
            }


            BusyIndicator {
                id: loadingIndicator
                Layout.alignment: Qt.AlignCenter
                running: root.loading
            }


        }
    }

    Plasmoid.toolTipMainText: i18n("Switch GPU mode.")
    Plasmoid.toolTipSubText: root.envycontrol ? i18n("%1 currently in use.", root.currentGPUMode.toUpperCase()) : i18n("EnvyControl is not working.")
}
