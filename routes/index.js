const router = require('express').Router();

const restApiBase = '/api/notes-service';

const healthEndPoints = require('./health');
const userEndPoints = require('./user');
// const notesEndPoints = require('./notes');

router.use(restApiBase, healthEndPoints);
router.use(restApiBase, userEndPoints);
// router.use(restApiBase, notesEndPoints);

module.exports = router;