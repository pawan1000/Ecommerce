const productsService = require('../services/productsService');

const time = Date.now();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix=Date.now();
        cb(null, time + file.originalname)
    }
})
const upload = multer({ storage: storage });


exports.getProductsById = async (req, res) => {
    let productId = req.params.id;
    try {
        let result = await productsService.getProductsById(productId);
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        let result = await productsService.getAllProducts();
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error });
    }
}

exports.getProductCountMonthwise = async (req, res) => {
    try {
        let result = await productsService.getProductCountMonthwise();
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error });

    }
}

exports.getProductCountCategorywise = async (req, res) => {
    try {
        let result = await productsService.getProductCountCategorywise();
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error });

    }
}

exports.getProductCountGenderwise = async (req, res) => {
    try {
        let result = await productsService.getProductCountGenderwise();
        res.json(result);
    }
    catch (error) {
        console.error("Error in getProductCountGenderwise service:", error);
        res.json({ error: 'Internal Server Error...' + error });

    }
}

exports.updateField = async (req, res) => {
    try {
        const { field, value } = req.body;
        const id = req.params.id;
        let result = await productsService.updateField(field, value, id);
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error });

    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        let result = await productsService.deleteProduct(id);
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error });
    }
}

exports.getProductsByFilter = async (req, res) => {
    try {
        const filter = req.params.filter_type;
        const page = parseInt(req.query.page) || 0;
        const start = page == 0 ? 0 : page * 4 - 4;
        let result = await productsService.getProductsByFilter(filter, page, start);
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error });

    }

}

exports.addProduct = [
    upload.single('image'),
    async (req, res) => {
        try {
            const product = req.body;
            const image = time + req.file.originalname;
            const result = await productsService.addProduct(product, image);
            res.json(result);
        }
        catch (error) {
            res.json({ error: 'Internal Server Error...' + error });
        }
    }
]