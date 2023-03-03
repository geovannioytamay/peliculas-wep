const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const gen='true';//para validar si se muestras el aside
    res.render('index', {gen});
});

module.exports = router;