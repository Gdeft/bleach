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
