const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const habbitController  = require('../controllers/habbit_controller');
const updateHabbit_Controller =  require('../controllers/updateHabbit_controller');
const updateTracker_Controller = require('../controllers/update_tracker_controller');

router.get('/',homeController.home);
router.post('/create-habbit',habbitController.create);
router.post('/create-tracker',updateTracker_Controller.createTracker);
router.get(`/update/habbit/:id` ,updateHabbit_Controller.update);
router.get('/delete_habbit/:id', habbitController.destroy);

module.exports = router;