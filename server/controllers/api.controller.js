// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

exports.sendHome = function(req, res) {
    res.send('api works');
};

exports.postInFormation = function(req, res) {
    axios.get(`${API}/posts`)
        .then(posts => {
            res.status(200).json(posts.data);
        })
        .catch(error => {
            res.status(500).send(error)
        });
};
exports.usersInformation = function(req, res) {
    axios.get(`${API}/users`)
        .then(users => {
            res.status(200).json(users.data);

        })
        .catch(error => {
            res.status(500).send(error)
        });
}