/*
* @Author: Homer
* @Date:   2017-12-29 22:16:34
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-29 23:09:04
*/
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '..','src','frontend','config','enviroment');
const config = require(path.join(configPath,process.env.NODE_ENV));
const replaceConfig = require('./replaceConfig');

module.exports = async function() {
    fs.readFile(path.join(configPath,'shared.nb.js'), 'utf8', function(err, text) {
        if (err) throw err;
        // Server config with env setting
        var textWithConfig = replaceConfig(text,config);
        fs.writeFile(path.join(configPath,'shared.js'), textWithConfig);
    });
};
