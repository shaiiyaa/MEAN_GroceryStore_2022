const express = require('express');
const info_dal = require('../data-access-layer/info-dal');
const router = express.Router();

router.get('', async (request, response) => {
    try {
        const info = await info_dal.getInfo();
        response.json(info);
    } catch (error) {
        response.status(500).send(error.message);
    }
   
})

module.exports = router;