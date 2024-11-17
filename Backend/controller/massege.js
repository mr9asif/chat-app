
const Message = require("../Models/message")
const Conversation = require("../Models/conversasion")



 const sendMsg =async(req,res)=>{
try {
    const {messages} = req.body;
    const {id:reciverId} = req.params;
    const senderId = req.user._id;
 

    let chats = await Conversation.findOne({
        participants:{$all:[senderId , reciverId]}
    })

    if(!chats){
        chats = await Conversation.create({
            participants:[senderId , reciverId],
        })
    }

    const newMessages = new Message({
        senderId,
        reciverId,
        message:messages,
        conversationId: chats._id
    })

    if(newMessages){
        chats.messages.push(newMessages._id);
    }

    await Promise.all([chats.save(),newMessages.save()]);

     //SOCKET.IO function 
    

    res.status(201).send(newMessages)

} catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })
    console.log(`error in sendMessage ${error}`);
}
}

// get msg
const getMsg = async (req, res)=>{
   try {
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

    const chats = await Conversation.findOne({
      participants :{ $all:[senderId, receiverId]}
    }).populate('messages');

    if(!chats) return [];
    const message = chats.messages;
    res.status(201).send(message)
   } catch (error) {
     res.send(error)
   }
}

module.exports = {sendMsg, getMsg};
