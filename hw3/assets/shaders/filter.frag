#version 430

out vec4 color;
in vec2 TexCoord;

uniform sampler2D colorBuffer;
uniform int enableEdgeDetection;
uniform int eanbleGrayscale;
uniform float gamma;

const float offset = 1.0 / 300;  
const vec2 offsets[9] = vec2[](
        vec2(-offset, offset),  // top-left
        vec2(0.0f,    offset),  // top-center
        vec2(offset,  offset),  // top-right
        vec2(-offset, 0.0f),    // center-left
        vec2(0.0f,    0.0f),    // center-center
        vec2(offset,  0.0f),    // center-right
        vec2(-offset, -offset), // bottom-left
        vec2(0.0f,    -offset), // bottom-center
        vec2(offset,  -offset)  // bottom-right
    );

float kernel[9] = float[](
    -1, -1, -1,
    -1,  8, -1,
    -1, -1, -1
);

// TODO#3-2: apply filter to color
// For grayscale, you need to mix rgb color with ratio (0.2126:0.7152:0.0722)
// For edge detection, you need to apply kernel matrix and sampling offset provided (offsets)

void main()
{
    color = texture(colorBuffer, TexCoord);
    float R = color.r, G = color.g, B = color.b;
    color = vec4(pow(R, gamma), pow(G, gamma), pow(B, gamma), 1.0);
    if (enableEdgeDetection == 1)
    {
        vec3 sampleText[9];
        for(int i=0; i < 9;++i)
        {
            sampleText[i] = vec3(texture(colorBuffer, TexCoord.st + offsets[i]));
        }
        // �Q���v�ȨD�̲ׯ��z�C��
        vec3 result = vec3(0.0);
        for(int i=0; i < 9;++i)
        {
            result += sampleText[i] * kernel[i];
        }
        color = vec4(result, 1.0);
    }
    if (eanbleGrayscale == 1)
    {
        float average = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
        color = vec4(average, average, average, 1.0);
    }
}