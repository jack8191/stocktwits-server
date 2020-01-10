const express = require('express')
const request = require('request')
const router = express.Router()

router.get('/:query', (req, res) => {
    console.log('working')
    const query = req.params.query
    request({
        uri: `https://api.stocktwits.com/api/2/streams/symbol/${query}.json`
    }).pipe(res)
})

module.exports = router