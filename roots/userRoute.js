import express from "express";
import { getusers,postusers,deleteusers,putusers,loginuser } from "../controllers/usercontrolls.js";

const userRouter =express.Router();

userRouter.get('/', getusers)

userRouter.post('/',postusers)

userRouter.delete('/',deleteusers)

userRouter.put('/',putusers)

userRouter.post('/login',loginuser)

export default userRouter;