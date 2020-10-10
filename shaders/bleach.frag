uniform sampler2D u_texture;
uniform float u_time;

varying vec4 v_color;
varying vec2 v_texCoord;

void main() {
	vec4 color = texture2D(u_texture, v_texCoord.xy);

	float t = clamp((sin(u_time * .02 + gl_FragCoord.x * .01 + gl_FragCoord.y * .005) + 1.) * 0.5,0.0, 1.0);
	vec3 c = vec3(mix(0.0, 1.0, t), mix(0.49, 0.39, t), mix(1.0, 0.85, t));

	gl_FragColor = vec4(color.rgb * c.rgb, mix(.10, 1., t));
}
