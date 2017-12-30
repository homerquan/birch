const _ = require('lodash');

const prefix = '__';

module.exports = (text, config) => {
		_.forEach(config, (value,key) => {
			text = text.replace(new RegExp(prefix + key,'g'), value);
		});
		return text;
}