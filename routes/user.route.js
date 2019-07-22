const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');

router.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }        
    next(); 
});

// a simple test url to check that all of our files are communicating correctly.
router.get('/', user_controller.test);
router.get('/:id/edit', user_controller.edit);
router.get('/buscar', user_controller.buscar);


//router.get('/test', user_controller.test);}

router.post('/create', user_controller.user_create);

router.get('/buscar/:name', user_controller.user_details);

router.get('/:id/turn', user_controller.user_turn);

router.post('/:id/update', user_controller.user_update); //put

router.delete('/:id/delete', user_controller.user_delete);

module.exports = router;