# Bleach
Bleaches the game.

## Changelog

### 1.4: Port to 6.0
```js
const music = loadMusic("bach");
var buffer, shader;

const beginDraw = () => {
	buffer.resize(Core.graphics.width, Core.graphics.height);
	buffer.begin(Color.clear);
};

const endDraw = () => {
	buffer.end();

	shader.bind();
	shader.setUniformf("u_time", Time.globalTime / 10);

	Draw.blend(Blending.additive);
	Draw.blit(buffer, shader);
};

Events.on(ClientLoadEvent, e => {
	music.setLooping(true);
	music.play();
    music.setVolume(100);

	buffer = new FrameBuffer(Core.graphics.width, Core.graphics.height);
	shader = new Shader(readString("shaders/screenspace.vert"), readString("shaders/bleach.frag"));
});

Events.run(Trigger.preDraw, beginDraw);

Events.run(Trigger.uiDrawBegin, () => {
	if(Vars.state.isMenu()){
		beginDraw();
	};
});

Events.run(Trigger.uiDrawEnd, endDraw);
```

### 1.2: sk7725's magic (sk7725)
```js
if(!Vars.headless){
	importPackage(Packages.arc.graphics.gl);
	const shader = new JavaAdapter(Shader, {
		apply(){
			this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
		}
	},
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision mediump float;precision mediump int;\n#endif\nuniform sampler2D u_texture;uniform float u_time;varying vec4 v_color;varying vec2 v_texCoord;void main(){vec4 color = texture2D(u_texture, v_texCoord.xy);float t = clamp((sin(u_time * .02 + gl_FragCoord.x * .01 + gl_FragCoord.y * .005) + 1.) / 2., 0., 1.);vec3 c = vec3(mix(0., 1., t), mix(.89, .39, t), mix(1., .85, t));gl_FragColor = vec4(color.rgb * c.rgb, mix(.10, 1., t));}");
}

Draw.shader(shader);
Draw.blend(Blending.additive);

const arr = Object.keys(Pal);

Events.on(EventType.Trigger.update, run(()=>{
    for(var i = 0; i < arr.length; i++){
        try{
            Pal[arr[i]] = Pal[arr[i]].shiftHue(0.2);
        }
        catch(err){}
    }
}));
```

### 1.1.2: Patch
```javascript
if(!Vars.headless){
	importPackage(Packages.arc.graphics.gl);
	const shader = new JavaAdapter(Shader, {
		apply(){
			this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
		}
	},
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision mediump float;precision mediump int;\n#endif\nuniform sampler2D u_texture;uniform float u_time;varying vec4 v_color;varying vec2 v_texCoord;void main(){vec4 color = texture2D(u_texture, v_texCoord.xy);float t = clamp((sin(u_time * .02 + gl_FragCoord.x * .01 + gl_FragCoord.y * .005) + 1.) / 2., 0., 1.);vec3 c = vec3(mix(0., 1., t), mix(.89, .39, t), mix(1., .85, t));gl_FragColor = vec4(color.rgb * c.rgb, mix(.10, 1., t));}");
}

Draw.shader(shader);
Draw.blend(Blending.additive);
```

### 1.1: Sonnicon's shader magic from the [Commandblocks](https://github.com/sk7725/commandblocks) mod.
```javascript
if(!Vars.headless){
	importPackage(Packages.arc.graphics.gl);
	const shader = new JavaAdapter(Shader, {
		apply(){
			this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
		}
	},
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision mediump float;precision mediump int;\n#endif\nuniform sampler2D u_texture;uniform float u_time;varying vec4 v_color;varying vec2 v_texCoord;void main(){vec4 color = texture2D(u_texture, v_texCoord.xy);float t = clamp((sin(u_time * .01 + gl_FragCoord.x * .01 + gl_FragCoord.y * .005) + 1.) / 2., 0., 1.);vec3 c = vec3(mix(0., 1., t), mix(.89, .39, t), mix(1., .85, t));gl_FragColor = vec4(color.rgb * c.rgb, color.a);}");
}

Draw.shader(shader);
Draw.blend(Blending.additive);
```

### 1.0: Release
```javascript
Draw.blend(Blending.additive); 
```