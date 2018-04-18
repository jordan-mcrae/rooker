const React       = require('react');
const ReactDOM    = require('react-dom');
const createClass = require('create-react-class');
const _           = require('lodash');
const gaConfig    = require('./gaConfig.js');
const userConfig  = {};
let   DOMContext  = [];
let   seeds       = [];

const Rooker = {
	Initialize: function(config) {
		if (window.ga || document.ga) return;
		_.merge(userConfig, config.defaults);
		gaConfig.Initialize(config);
	},
	ProcessHooks: function(config) {
		_.forEach(config.track, function(item) {
			Rooker.FindElementMatch(item);
		});
		Rooker.GenerateGAHooks();
	},
	FindElementMatch: function(selector) {
		const domSelector = selector.target || selector;
		const match = _.find(DOMContext, function(ele) {
			const className = ele.className;
			const id        = ele.id;
			const type      = _.lowerCase(ele.nodeName).replace(/\s/g,''); 
			if (_.includes(domSelector, '.') && _.includes(className, domSelector.replace('.',''))) return ele;
			if (_.includes(domSelector, '#') && _.includes(id, domSelector.replace('#', ''))) return ele;
			if (domSelector === type) return ele;
		});
		if (match) {
			match.selector = selector;
			seeds.push(match);
		}
	},
	GenerateGAHooks: function() {
		_.forEach(seeds, function(fruit, i) {
			fruit.addEventListener('click', function() {
				window.ga('send', {
					hitType       : 'event',
					eventCategory : fruit.selector.category || userConfig.category || 'defaultCategory',
					eventAction   : fruit.selector.action || userConfig.action || 'defaultAction',
					eventLabel    : fruit.selector.label || userConfig.label || 'defaultLabel',
				});
			});
		});
	},
	RemoveGAHooks: function() {
		_.forEach(seeds, function(fruit) {
			fruit.removeEventListener('click');
		});
	},
	Rooker : function(config, Child) {
		return createClass({
			componentWillMount: function() {
				Rooker.Initialize(config);
			},
			componentDidMount: function() {
				DOMContext = ReactDOM.findDOMNode(this).getElementsByTagName('*');
				Rooker.ProcessHooks(config);
			},
			componentWillUnmount: function() {
				Rooker.RemoveHooks(config);
			},
			render: function() {
				return React.createElement(Child);				
			}
		});
	}
};

module.exports = Rooker;
