import { messageModel } from "../models/messages.model.js";

export default class MessageManager {
  getMessages = async () => {
    try {
      return await messageModel.find().exec();
    } catch (error) {
      console.log(error);
    }
  };

  createMessage = async (message) => {
    try {
      await messageModel.create(message);
    } catch (error) {
      console.log(error);
    }
  };
}
