const sanitizeHTML = require('sanitize-html');

module.exports = function(url,callback){
  const mongoose = require('mongoose');
  mongoose.connect(url,callback);

  const Message = mongoose.model(
    'messages',
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

  return {
    // Create a new massage from the form
    create:function(newMessage,callback){
      // try {
        var message = new Message(newMessage);
        message.save(callback);
      // } catch(e) {
      //   console.log(e);
      // }      
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
