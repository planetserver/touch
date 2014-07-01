#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D tex;
uniform float leftEye;
varying vec2 fragTexCoord;

void main()
{
	float distortionScale = 0.7;
    vec2 lensCenter = vec2(0.151976495726, 0.0);
    if (leftEye == 0.0)
	{
		lensCenter.x *= -1.0;
    }

    vec2 theta = (fragTexCoord * 2.0) - 1.0;
    float rSq = theta.x * theta.x + theta.y * theta.y;
    vec2 rvec = theta * (1.0 + 0.22 * rSq + 0.24 * rSq * rSq);
    vec2 texCoord = (distortionScale*rvec+(1.0-distortionScale)*lensCenter + 1.0) / 2.0;

    if (any(notEqual(clamp(texCoord, vec2(0.0, 0.0), vec2(1.0, 1.0)) - texCoord,vec2(0.0, 0.0))))
	{
		//if (leftEye == 0.0) gl_FragColor = vec4(1.0,1.0,0.0,1.0);
		//else gl_FragColor = vec4(1.0,0.0,0.0,1.0);
		discard;
    }
    else
	{
		vec3 col = texture2D(tex, texCoord).rgb;
        gl_FragColor = vec4(col, 1.0);
    }
}