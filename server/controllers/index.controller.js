//var request = require('request');

exports.home = function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
};