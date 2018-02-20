const sanitizeHTML = require('sanitize-html');

module.exports = function(url,callback){
  const mongoose = require('mongoose');
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
        var message = new Message(newMessage);
      } catch(exception) { 
        return callback("Unable to create a new message");
      } 
      message.save(callback);     
    },
    read:function(id,callback){
      // console.log(id);
      Message.findById(id, callback);
      // callback();
    },
    readUsername:function(username,callback){
      Message.find({ username: username }).find(callback);
      //callback();
    },
    readAll:function(callback){
      // callback();
      Message.find(callback);
    },
    update:function(id,updatedMessage,callback){
      Message.findByIdAndUpdate(id, updatedMessage, callback);
      //callback()
    },
    delete:function(id,callback){
      Message.findByIdAndRemove(id, callback);
      // callback();
    },
    deleteAll:function(callback){
      Message.remove(callback);
    },
    disconnect:function(){
      mongoose.disconnect();
    }
  };
};
