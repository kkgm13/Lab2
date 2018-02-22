const sanitizeHTML = require('sanitize-html');
const mongoose = require('mongoose');

module.exports = function(url,callback){
  mongoose.connect(url,callback);

  const messageSchema = new mongoose.Schema(
    {
      username:{
        type: String,
        required: true
      }, 
      text:{
        type: String, 
        required: true
      }
    },
    {strict: 'throw'}
  );

  const Message = mongoose.model(
    'messages',
    messageSchema
  );

  return {
    // Create a new massage from the form
    create:function(newMessage,callback){
      try {
        //Create a new message
        var message = new Message(newMessage);
      } catch(exception) { 
        //1.4: state that a message can't be made
        return callback("Unable to create a new message");
      }
      //-- Preventing XSS --//
      //Security: Sanitize the user's message
      if(message.username){
        message.username = sanitizeHTML(message.username);
      }
      //Security: Santize the Text Message
      if(message.text){
        message.text = sanitizeHTML(message.text);
      }
      //Save and send message
      message.save(callback);     
    },
    read:function(id,callback){
      Message.findById(id, callback);
    },
    readUsername:function(username,callback){
      // -- Prevent Code Injection -- //
        //If the username is not a open String input
      if(typeof username !== 'string'){
        //Presnet that is impossible to parse the username
        return callback('Can\'t parse username.');
      }
      Message.find({ username: username }).find(callback);
    },
    readAll:function(callback){
      Message.find(callback);
    },
    update:function(id,updatedMessage,callback){
      Message.findByIdAndUpdate(id, updatedMessage, callback);
    },
    delete:function(id,callback){
      Message.findByIdAndRemove(id, callback);
    },
    deleteAll:function(callback){
      Message.remove(callback);
    },
    disconnect:function(){
      mongoose.disconnect();
    }
  };
};
