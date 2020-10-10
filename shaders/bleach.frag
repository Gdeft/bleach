uniform sampler2D u_texture;
uniform float u_time;

varying vec4 v_color;
varying vec2 v_texCoords;

void main(){
	vec2 uv = gl_FragCoord / v_texCoords.xy;
    vec3 col = texture2D(u_texture, 0.7 + 0.5 * cos(u_time + uv.xyx + vec3(0, 4, 6)));

    gl_FragColor = vec4(col, 1.0);
};
