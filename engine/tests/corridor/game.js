import RPGinia from "/src/RPGinia.js";

const engine = new RPGinia();
const app = new engine.App("Test RPGinia app");
const load = new app.Loaders;
const world = new app.World;
const kb = new app.Keyboard;

kb.addKey("enter", 13);
kb.addKey("arrUp", 38);
kb.addKey("arrDown", 40);
kb.addKey("arrLeft", 37);
kb.addKey("arrRight", 39);
kb.addKey("shift", 16);

const levelPaths = [
    "/resources/levels/menu/menu.json",
    "/resources/levels/corridor/corridor.json",
    "/resources/levels/set_language/languages.json",
];
const levels = load.jsonFiles("level", levelPaths);

const languagePaths = [
    "/resources/languages/english.json",
    "/resources/languages/russian.json",
    "/resources/languages/ukrainian.json"
];
const languages = load.jsonFiles("language", languagePaths);

app.setGlobalVariable("currentLanguage", 0);

world.initialize({
    app: app,
    levels: levels,
	currentLevelId: 1,
    keyboard: kb,
    languages: languages
});

function draw() {
    app.clearPlayground();
    world.draw();
    requestAnimationFrame(draw);
}
draw();