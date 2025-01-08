import Category from "../models/category.js";

export function getcategories(req, res) {
    Category.find()
       .then((categoriesList) => {
            res.json({
                list: categoriesList
            });
        })
       .catch((err) => {
            res.status(500).json({
                message: "Error fetching categories",
                error: err
            });
        });
}

export function createCategory(req, res) {
    // Check if the user is logged in (token is valid)
    if (!req.user) {
        return res.status(401).json({
            message: 'Not authorized, please login'
        }); 
    }

    // Check if the user is an admin
    if (req.user.type !== "admin") {
        return res.status(403).json({
            message: 'Not authorized to create a category'
        });
    }

    // Proceed to create the category if the user is an admin
    const newCategory = new Category(req.body);
    
    newCategory.save()
     .then((result) => {
            res.json({
                message: "Category created successfully",
                result: result
            });
        })
        .catch((err) => {
            res.status(400).json({
                message: "Category creation failed",
                error: err.message
            });
        });
}
