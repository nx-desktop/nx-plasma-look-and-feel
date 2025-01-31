import QtQuick 2.2

import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 2.0 as PlasmaComponents // Because PC3 ToolButton can't take a menu

import QtQuick.Controls 1.3 as QQC

PlasmaComponents.ToolButton {
    id: keyboardButton

    property int currentIndex: -1

    text: currentIndex >= 0 && instantiator.objectAt(currentIndex) 
        ? i18nd("plasma_lookandfeel_org.kde.lookandfeel", "Keyboard Layout: %1", instantiator.objectAt(currentIndex).shortName)
        : i18nd("plasma_lookandfeel_org.kde.lookandfeel", "Keyboard Layout: Unknown")

    implicitWidth: minimumWidth

    visible: keyboard.layouts.length > 1

    Component.onCompleted: {
        currentIndex = Qt.binding(function() { return keyboard.currentLayout; });
        console.log("Initialized currentIndex:", currentIndex);
    }

    style: NitruxToolButtonStyle{}

    menu: QQC.Menu {
        id: keyboardMenu
        style: BreezeMenuStyle {}
        Instantiator {
            id: instantiator
            model: keyboard.layouts
            onObjectAdded: {
                console.log("Object added at index:", index, "Object:", object);
                keyboardMenu.insertItem(index, object);
            }
            onObjectRemoved: {
                console.log("Object removed:", object);
                keyboardMenu.removeItem(object);
            }
            delegate: QQC.MenuItem {
                text: modelData.longName || "Unknown"
                property string shortName: modelData.shortName || "Unknown"
                onTriggered: {
                    console.log("Selected layout index:", model.index, "Short name:", shortName);
                    keyboard.currentLayout = model.index;
                }
            }
        }
    }
}
