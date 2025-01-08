import {getcategories,createCategory } from "../controllers/categorycontrolls.js"
import express from "express"

const categoryRouter = express.Router()

categoryRouter.get('/', getcategories)

categoryRouter.post('/', createCategory)

export default categoryRouter;