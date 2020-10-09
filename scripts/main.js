const music = loadMusic("Bach - Fugue in D Minor");
var buffer, shader;

const beginDraw = () => {
	if(!buffer){
		buffer = new FrameBuffer(Core.graphics.getWidth(), Core.graphics.getHeight());
	};

	buffer.resize(Core.graphics.getWidth(), Core.graphics.getHeight());
	buffer.begin(Color.clear);
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

	Vars.control.music.ambientMusic = Seq();
	Vars.control.music.darkMusic = Seq();
	music.setLooping(true);
	music.play();

	shader = new Shader(readString("shaders/screenspace.vert"), readString("shaders/bleach.frag"));
});

Events.run(Trigger.preDraw, () => beginDraw());

Events.run(Trigger.uiDrawBegin, () => {
	if(Vars.state.isMenu()){
		beginDraw();
	};
});

Events.run(Trigger.uiDrawEnd, () => endDraw());
