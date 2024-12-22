import express from "express";
const galleryitemrouter = express.Router();
import { postgalleryitem ,getgalleryitem} from "../controllers/galleryitemcontroller.js";

galleryitemrouter.post('/',postgalleryitem);
galleryitemrouter.get('/',getgalleryitem);



export default galleryitemrouter;