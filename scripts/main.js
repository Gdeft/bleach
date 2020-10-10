const music = loadMusic("Bach - Fugue in D Minor");
var buffer, shader;

const beginDraw = () => {
	buffer.resize(Core.graphics.width, Core.graphics.height);
	// crash
//	buffer.begin(Color.clear);
};

const endDraw = () => {
	buffer.end();

	shader.bind();
	shader.setUniformf("u_time", Time.globalTime() / Scl.scl(1.0));

	Draw.blend(Blending.additive);
	Draw.blit(buffer, shader);
};

Events.on(ClientLoadEvent, e => {
	Vars.control.music = extend(MusicControl, {
		update(){}
	});

	Vars.control.music.ambientMusic = new Seq();
	Vars.control.music.darkMusic = new Seq();
	music.setLooping(true);
	music.play();

	buffer = new FrameBuffer(Core.graphics.width, Core.graphics.height);
	shader = new Shader(readString("shaders/bleach.vert"), readString("shaders/bleach.frag"));
});

Events.run(Trigger.preDraw, beginDraw);

Events.run(Trigger.uiDrawBegin, () => {
	if (Vars.state.isMenu()) {
		beginDraw();
	}
});

Events.run(Trigger.uiDrawEnd, endDraw);
