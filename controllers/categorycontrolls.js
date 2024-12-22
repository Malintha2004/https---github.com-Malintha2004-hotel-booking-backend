import Category from "../models/category.js"

export function getcategories(req, res){
    Category.find()
       .then((categoriesList) => {
            res.json({
                list: categoriesList
            });
        })
       .catch((err) => {
            res.status(500).json({
                message: "Error fetching catagories",
                error: err
            });
        });
 
}

export function postcategories(req, res){
    const newCategory = new Category(req.body);
    newCategory.save()
     .then(() => {
            res.json({
                message: "Category created successfully"
            });
        })
     .catch((err) => {
            res.status(400).json({
                message: "Category creation failed"
            });
        });
}
