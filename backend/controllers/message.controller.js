import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage=async(req,res)=>{
    try {
        const {message}=req.body;
        const {id:recieverId}=req.params;
        const senderId=req.user._id;

        var conversation=await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,recieverId] 
            })
        }

        const newMessage=new Message({
            senderId,
            recieverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();
        // this will run parallel
        await Promise.all([conversation.save(),newMessage.save()])
        return res.status(201).json(newMessage);
    } catch (error) {
        console.log("error  in send message comntroller",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}
export const getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        return res.status(200).json(conversation.messages);

    }catch(error){
        console.log("error  in get message comntroller",error.message);
        return res.status(500).json({error:"Internal server error"})
    }
}