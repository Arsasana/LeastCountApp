const express = require('express');
const router = express.Router();
var api = require('../controllers/api.controller');

router.route('/catalogues')
    .get(api.postInFormation);
// .post(catalogues.apiPOST);
router.route('/sendHome')
    .get(api.sendHome);
router.route('/participants')
    .get(api.usersInformation);

module.exports = router;