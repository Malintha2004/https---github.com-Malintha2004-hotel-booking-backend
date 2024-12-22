import Galleryitem from "../models/galleryitem.js"

export function postgalleryitem(req, res){

const user=req.user
if(user==null){
    return res.status(403).json({
        message: 'Not authorized, please login'
    }); 
    return
}
if(user.type!="admin"){
    return res.status(403).json({
        message: 'Not authorized, you are not an admin'
    });
    return
}

    const galleryitem = req.body;  // Get data from request body
const newgalleryitem = new Galleryitem(galleryitem);  // Use galleryitem to populate the new instance
    newgalleryitem.save()
        .then(()=>{
            res.json({
                message: 'Gallery item created'
            })
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json({
                message:"gallery item creation failed"
            })
            
        }) 
} 
export function getgalleryitem(req, res) {
    Galleryitem.find()
        .then((list) => { // Correctly closing the arrow function
            res.json({
                list: list
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving gallery items'
            });
        });
}


