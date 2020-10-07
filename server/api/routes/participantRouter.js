module.exports = app => {
    const controller = require('../controllers/participantController')();

    app.route('/api/v1/participant')
        .get(controller.getParticipant);
}