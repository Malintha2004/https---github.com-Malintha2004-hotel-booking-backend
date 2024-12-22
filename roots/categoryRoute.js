import {getcategories,postcategories } from "../controllers/categorycontrolls.js"
import express from "express"

const categoryRouter = express.Router()

categoryRouter.get('/', getcategories)

categoryRouter.post('/', postcategories)

export default categoryRouter;