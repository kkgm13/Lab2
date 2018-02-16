const sanitizeHTML = require('sanitize-html');

module.exports = function(url,callback){
  const mongoose = require('mongoose');
  mongoose.connect(url,callback);

  const Message = mongoose.model(
    'messages',
    { username:String, text:String }
  );

  // const ID = mongoose.model(
  //   ''
  // );

  //mongoose.connect('mongodb://localhost:27017/test');

  // const credentials = mongoose.model(
  //   "credentials",
  //   {
  //     username: "alice", password: "abc123"
  //   }
  // );


  return {
    // Create a new massage from the form
    create:function(newMessage,callback){
      // callback();
      var message = new Message(newMessage);
      message.save(callback);
    },
    read:function(id,callback){
      // console.log(id);
      Message.findById(id, callback);
      // callback();
    },
    readUsername:function(username,callback){
      callback();
    },
    readAll:function(callback){
      callback();
    },
    update:function(id,updatedMessage,callback){
      callback();
    },
    delete:function(id,callback){
      callback();
    },
    deleteAll:function(callback){
      Message.remove({},callback);
    },
    disconnect:function(){
      mongoose.disconnect();
    }
  };
};
