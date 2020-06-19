import QtQuick 2.9
import org.kde.plasma.core 2.0 as PlasmaCore
import QtGraphicalEffects 1.0

Item {
    id: backgroundRoot
    
	property alias source: wallImage.source
    property bool blurEnabled: wallpaper.configuration.Blur
    property var bkColor: wallpaper.configuration.Color
    property var blurRadius: wallpaper.configuration.BlurRadius
    property var fillMode: wallpaper.configuration.FillMode
    property bool dayNightEnabled: wallpaper.configuration.DayNightColoring
    property real dayNightEffect: wallpaper.configuration.DayNightEffect
    property int dayNightOffset: wallpaper.configuration.DayNightOffset
    property real timeoffestForDayNight : (Date.now()+(dayNightOffset*1000)+(new Date()).getTimezoneOffset())%86400000/86400000
    property var imagesMapping: wallpaper.configuration.ImagesList
    property var transitionMapping: wallpaper.configuration.TransitionList

    anchors.fill:parent
    
//     onTimeoffestForDayNightChanged:{
//         console.log(timeoffestForDayNight);
//         console.log( new Date((timeoffestForDayNight * 86400000) - (43200*1000)) );
//         console.log(dayNightOffset);
//     }

    
    Rectangle {
        id:bkRect
        anchors.fill:parent
        color: backgroundRoot.bkColor

        Image {
            id: wallImage
            anchors.fill:parent
            asynchronous:true

            smooth: true
            cache: true

            source: backgroundRoot.mapOffestToImage(timeoffestForDayNight);
            fillMode: backgroundRoot.fillMode

        }
    }
    FastBlur {
        id: blur

        visible: backgroundRoot.blurEnabled
        enabled: visible

        anchors.fill: bkRect

        source: bkRect
        radius: backgroundRoot.blurRadius
    }
    layer.enabled:  backgroundRoot.dayNightEnabled
    layer.effect: ShaderEffect {        
        property variant effectStrength: backgroundRoot.dayNightEffect
        property variant dayNightTex : Image {  source: "day_night_gradient.png" }
        property variant desaturateTex : Image { source: "desaturate_gradient.png" }
        property variant shadingTex : Image { source: "day_night_shading.png" }
        property variant timePos :Qt.point(backgroundRoot.timeoffestForDayNight,1)
        fragmentShader: "varying highp vec2 qt_TexCoord0;
                        uniform float effectStrength;
                        uniform vec2 timePos;
                        uniform sampler2D dayNightTex;
                        uniform sampler2D desaturateTex;
                        uniform sampler2D shadingTex;
                        uniform lowp sampler2D source;
                        uniform lowp float qt_Opacity;

                        void main() {
                            lowp vec4 tex = texture2D(source, qt_TexCoord0);
                            lowp vec4 coloringEffect = texture2D(dayNightTex, timePos);
                            lowp vec4 desturateEffect = texture2D(desaturateTex, timePos);
                            lowp vec4 shadingEffect = texture2D(shadingTex, timePos);
                            float satur = dot(tex.rgb, vec3(0.2126, 0.7152, 0.0722 ));
                            gl_FragColor = (mix( tex.rgba ,vec4(satur,satur,satur,1) , desturateEffect.r ) + 
                                        (( coloringEffect.rgba - vec4(0.75, 0.75, 0.75, 1) ) * effectStrength)) * 
                                        mix( vec4(1,1,1,1), shadingEffect.rgba, effectStrength ) *
                                        qt_Opacity;
                        }
                        "
    }
    
    function mapOffestToImage(offset) {
        var retImage = null;
        for(var idx in backgroundRoot.TransitionList) {
            if(backgroundRoot.TransitionList[idx] > offset) {
                break;
            }
            retImage = backgroundRoot.imagesMapping[idx];
        }
        
        return  retImage;
    }
}
