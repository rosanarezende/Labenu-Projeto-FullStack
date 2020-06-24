import express from "express";
import { UserController } from "../controller/UserController";
//linha responsável por criar um módulo de rotas no express
export const userRouter = express.Router();
const userController = new UserController()

userRouter.post("/signup/listening", userController.signupListeningUser);
userRouter.post("/signup/administrator", userController.signupAdministratorUser);
userRouter.post("/signup/band", userController.signupBandUser);
userRouter.post("/login", userController.login)
userRouter.post("/approve-band", userController.aproveBand)
userRouter.post("/block-user", userController.blockUser)
userRouter.post("/change-name", userController.changeNameById)
userRouter.post("/make-premium", userController.makePremium)

userRouter.get("/bands", userController.getAllBands)
userRouter.get("/users", userController.getAllUsers)
userRouter.get("/profile", userController.getProfile)