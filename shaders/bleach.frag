uniform sampler2D u_texture;
uniform float u_time;

varying vec4 v_color;
varying vec2 v_texCoords;

void main(){
	vec2 uv = gl_FragCoord / v_texCoords.xy + u_time;
    vec3 col = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(2, 4, 5));

    gl_FragColor = vec4(col, 1.0);
};
