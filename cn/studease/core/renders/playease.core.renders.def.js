﻿(function(playease) {
	var utils = playease.utils,
		events = playease.events,
		core = playease.core,
		renders = core.renders,
		rendermodes = renders.modes,
		css = utils.css,
		
		RENDER_CLASS = 'pla-render',
		
		// For all api instances
		CSS_SMOOTH_EASE = 'opacity .25s ease',
		CSS_100PCT = '100%',
		CSS_ABSOLUTE = 'absolute',
		CSS_IMPORTANT = ' !important',
		CSS_HIDDEN = 'hidden',
		CSS_NONE = 'none',
		CSS_BLOCK = 'block';
	
	renders.def = function(view, config) {
		var _this = utils.extend(this, new events.eventdispatcher('renders.def')),
			_defaults = {},
			_video;
		
		function _init() {
			_this.name = rendermodes.DEFAULT;
			
			_this.config = utils.extend({}, _defaults, config);
			
			_video = utils.createElement('video');
			_video.controls = _this.config.controls;
			_video.autoplay = _this.config.autoplay;
			_video.playsinline = _video['webkit-playsinline'] = _this.config.playsinline;
			_video.poster = _this.config.poster;
			if (!_this.config.autoplay) {
				try {
					_video.addEventListener('play', _onVideoPlay);
				} catch(err) {
					_video.attachEvent('onplay', _onVideoPlay);
				}
			}
		}
		
		_this.setup = function() {
			_this.dispatchEvent(events.PLAYEASE_READY, { id: _this.config.id });
		};
		
		_this.play = function(url) {
			if (url) {
				config.url = url;
			}
			
			if (url || _video.src != config.url) {
				_video.pause();
				_video.src = config.url;
				_video.load();
			}
			
			_video.play();
		};
		
		_this.pause = function() {
			_video.pause();
		};
		
		_this.seek = function(offset) {
			
		};
		
		_this.stop = function() {
			_video.pause();
			_video.src = null;
		};
		
		_this.volume = function(vol) {
			
		};
		
		_this.mute = function(bool) {
			bool = !!bool;
		};
		
		function _onVideoPlay(e) {
			try {
				_video.removeEventListener('play', _onVideoPlay);
			} catch(err) {
				_video.detachEvent('onplay', _onVideoPlay);
			}
			
			_this.dispatchEvent(events.PLAYEASE_VIEW_PLAY);
		}
		
		_this.element = function() {
			return _video;
		};
		
		_this.resize = function(width, height) {
			
		};
		
		_this.destroy = function() {
			
		};
		
		_init();
	};
})(playease);
