const crypto    = require('crypto');
const express   = require('express');

// ...

const routes = express.Router();

// ...

routes.post('/resources', (_, res) => {

    
    console.log('tms-content: Creating content resource.');

    // ...

    const id = crypto.randomUUID();
    
    // ...

    res.send({
        id
    });
});

// ...

module.exports = routes;