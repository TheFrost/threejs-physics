precision highp float;

varying vec3 vNormal;
varying vec3 vOffset;

void main() {
  gl_FragColor = vec4(vNormal * vOffset, 1.0);
}