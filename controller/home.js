const Product = require('../model/product');
const secure = require('../config/secure');

module.exports.home = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Home page of API project",
            success: true
        })
    } catch (error) {
        console.log("Error in finding the home page", error);
        return res.status(500).json({
            message: "Internal server error finding the home page",
            error
        })
    }
}

module.exports.fetchData = async (req, res) => {
    try {
        const response = await fetch(secure.apiurl);
        const productData = await response.json();
        const cleanedProductData = productData.map(product => ({
            ...product,
            price: parseFloat(product.price),
        }));
        await Product.collection.drop();
        await Product.insertMany(cleanedProductData)
        return res.status(200).json({
            message: "Database initialize with seed data"
        })
    } catch (error) {
        console.log("Error in fetching the data", error);
        return res.status(500).json({
            message: "Internal Server Error in finding the data",
            error
        })
    }
}

module.exports.transaction = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = 6;
        const skip = (page - 1) * limit;
        let search = req.query.search;
        const query = {};
        if(search){
            query.$or=[
                { title: { $regex: search , $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
            const priceAsNumber = parseInt(search);
            if(!isNaN(priceAsNumber)){
                query.$or.push({price: {$eq: priceAsNumber}});
            }
        }

        const transactionData = await Product.find(query)
        .skip(skip)
        .limit(limit)

        const totalCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalCount/limit)

        return res.status(200).json({
            message: "here is the pagination data",
            transactionData,
            totalCount,
            page,
            pageLimit: limit,
            totalPages

        })
    } catch (error) {
        console.error("Error in fetching transaction", error);
        return res.status(500).json({
            message: "Internal Server error in fetching transaction data",
            error,
        });
    }
};

