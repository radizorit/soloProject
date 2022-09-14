const express = require('express');
const router = express.Router();

const {
    createMessage,
} = require('../controllers/message.js')

router.route('/api/1/communications/message/create')
    .post(createMessage)

// router.route('/api/1/communications/message/get')
//     .get(getAllMessages)

// router.route('/api/1/communications/message/delete/:id')
//     .delete(deleteMessage)

// router.route('/api/1/communications/message/update/:id')
//     .put(updateMessage)

module.exports = router
//need delete and put routes