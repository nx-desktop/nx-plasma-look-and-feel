varying highp vec2 qt_TexCoord0;
uniform float effectStrength;
uniform vec2 timePos;
uniform sampler2D dayNightTex;
uniform sampler2D desaturateTex;
uniform lowp sampler2D source;
uniform lowp float qt_Opacity;

void main() {
    lowp vec4 tex = texture2D(source, qt_TexCoord0);
    lowp vec4 coloringEffect = texture2D(dayNightTex, timePos);
    lowp vec4 desturateEffect = texture2D(desaturateTex, timePos);
    float satur = dot(tex.rgb, float3(0.2126, 0.7152, 0.0722 ))
    gl_FragColor = (lerp( tex.rgba ,vec4(satur,satur,satur,1),desturateEffect.r ) + 
                   (( coloringEffect.rgba - vec4(0.33, 0.33, 0.33,1) ) * effectStrength)) * 
                   qt_Opacity;
}
