module.exports = () => {

    const controller = {};
  
    controller.getParticipant = (req, res) => res.status(200).json({teste:"teste"});
  
    return controller;
  }