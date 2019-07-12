attribute vec4 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;

varying vec3 vNormal;
varying vec3 vOffset;

void main() {
  vNormal = normal;

  vec4 offset = position;
  float dist = sin(time) * 0.5 + 0.5;
  offset.xyz += normal * dist;
  vOffset = offset.xyz * dist * 0.05 + 0.2;

  gl_Position = projectionMatrix * modelViewMatrix * offset;
}