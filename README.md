# Bleach
Bleaches the game.

## Disabling
There are two known ways of disabling the mod.
### Mods Menu
You can try  this method by disabling the mod through the **Mods** menu in the game. After you've done that, you can reload the game and everything should go back to normal again after that.

### Mods Directory
If you somehow can't disable the mod through the mod menu, you can delete the mod file or move it somewhere else directly in the games's `mods` directory. The list below is how you get to the game's `mods` directory according to the platform you're in.

* Linux: `~/.local/share/Mindustry/mods/`
* Steam: `steam/steamapps/common/Mindustry/mods/`
* Windows: `%appdata%/Mindustry/mods/`
* Android: `/data/io.anuke.mindustry/files/mods/`
* Apple: `~/Library/Application Support/Mindustry/mods/`

Delete the mod file and that's it. If it still doesn't work, try reloading the game again.

## Version
### 1.0: Release
```javascript
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

### 1.2: sk7725's magic (?)
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
    for(var i=0;i<arr.length;i++){
        try{
            Pal[arr[i]] = Pal[arr[i]].shiftHue(0.2);
        }
        catch(err){}
    }
}));
```
