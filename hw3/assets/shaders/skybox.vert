#version 430

layout(location = 0) in vec3 position;

out vec3 TexCoord;

uniform mat4 Projection;
uniform mat4 ViewMatrix;

// TODO#1-2: vertex shader / fragment shader
// 1. properly set gl_Position and TexCoord in vertex shader
// 2. properly set color with skybox texture and input from vertex shader

void main()
{
  vec4 pos = Projection * ViewMatrix * vec4(position, 1.0);
  gl_Position = vec4(pos.x, pos.y, pos.w, pos.w);
  TexCoord = vec3(position.x, position.y, position.z);
}