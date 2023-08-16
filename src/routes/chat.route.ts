import "reflect-metadata";
import { Router } from "express";
// const { signUpValidate } = require("../validations/user.validations");
import ChatController from "../controller/chat.controller";
import { Container } from "typedi";
import { verify } from "../middleware/verifyToken";
const router = Router();

const controller = Container.get(ChatController);

router.get("/:roomId", controller.getChatsController);

router.post("/archive/:roomId", controller.archiveChatsController);

export { router };
