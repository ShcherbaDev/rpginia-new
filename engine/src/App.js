import Loaders from "./Loaders.js";
import World from "./World.js";
import Keyboard from "./Keyboard.js";
import AudioManager from "./AudioManager.js";
import Player from "./Player.js";
import Camera from "./Camera.js";

/**
 * Class with main engine functional.
 * @memberof RPGinia
 * @class
 */
class App {
	/**
	 * @constructor
	 * @param {string} [title=RPGinia app] - App's title.
	 * @param {Object} [canvas=document.querySelector("canvas")] - App's playground.
	 * @param {Array} [sizes=[800, 600]] - Playground sizes. First element - width, second element - height.
	 * @param {boolean} [isImageSmoothingEnabled=false] - Image smoothing.
	 */
	constructor(title = "RPGinia app", canvas = document.querySelector("canvas"), sizes = [800, 600], isImageSmoothingEnabled = false) {
		this._title = title;
		this._canvas = canvas;
		this._context = this._canvas.getContext("2d");
		this._sizes = sizes;
		this._isImageSmoothingEnabled = isImageSmoothingEnabled;

		/**
		 * An array of global variables
		 * @private
		 */
		this._globalVariables = [];
		
		/**
		 * Class for loading files.
		 * @name RPGinia#App#Loaders
		 * @memberof RPGinia#App
		 */
		this.__proto__.Loaders = Loaders;
		Loaders.prototype.appPath = this.__proto__.appPath;

		/**
		 * Class for event handling from the keyboard.
		 * @name RPGinia#App#Keyboard
		 * @memberof RPGinia#App
		 */
		this.__proto__.Keyboard = Keyboard;
		
		/**
		 * Class for listening the audio files.
		 * @name RPGinia#App#AudioManager
		 * @memberof RPGinia#App
		 */
		this.__proto__.AudioManager = AudioManager;
		AudioManager.prototype.appPath = this.__proto__.appPath;

		/**
		 * Class for drawing player.
		 * @name RPGinia#App#Player
		 * @memberof RPGinia#Player
		 */
		this.__proto__.Player = Player;

		/**
		 * Class for working with levels.
		 * @name RPGinia#App#World
		 * @memberof RPGinia#App
		 */
		this.__proto__.World = World;
		World.prototype.appPath = this.__proto__.appPath;
		World.prototype.canvas = this._canvas;
		World.prototype.context = this._context;

		/**
		 * Class for working with camera: move, zoom or rotate camera.
		 * @name RPGinia#App#Camera
		 * @memberof RPGinia#App
		 */
		this.__proto__.Camera = Camera;

		this._init();
	}
	
	/**
	 * Initialize method for setting up the playground's sizes and image smoothing.
	 * @private
	 */
	_init() {
		this._canvas.width = this._sizes[0];
		this._canvas.height = this._sizes[1];
		this._context.imageSmoothingEnabled = this._isImageSmoothingEnabled;
	}
	
	/**
	 * Clears a playground.
	 */
	clearPlayground() {
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
	}

	/**
	 * Adds a global variable into an global variables array.
	 * @param {string} name - The name of a global variable. 
	 * @param {*} value - The value of a global variable.
	 * @returns {*} The value of a created global variable.
	 */
	setGlobalVariable(name, value) {
		this._globalVariables[name] = value;
		return this._globalVariables[name];
	}

	/**
	 * Gets a value of global variable by name.
	 * @param {string} name - Searched global variable name.
	 * @returns {*} The value of searched global variable.
	 */
	getGlobalVariable(name) {
		return this._globalVariables[name];
	}

	/** 
	 * Get a canvas object.
	 * @readonly
	 * @type {Object}
	 */
	get canvas() { return this._canvas }

	/** 
	 * Get a context object for draw object
	 * @readonly
	 * @type {Object}
	 */
	get context() { return this._context }

	/** 
	 * Get an array of global variables.
	 * @readonly
	 * @type {Array}
	 */
	get globalVariables() { return this._globalVariables }
}

export default App;