const Product = require('../model/product');

module.exports.totalSaleAmount = async (req, res)=>{
    try {
        const selectedMonth = req.query.month;
        const totalSaleAmount = await Product.aggregate([
            {
                $match:{
                    dateOfSale:{
                        $gte: new Date(selectedMonth),
                        $lt: new Date(new Date(selectedMonth)
                        .setMonth(new Date(selectedMonth)
                        .getMonth()+1)),
                    },
                    sold: true,
                },
            },
            {
                $group:{
                    _id: null,
                    totalAmount: {$sum: '$price'},
                },
            },
        ]);
        return res.status(200).json({
            message: "Total Sale Amount!!",
            totalSaleAmount: totalSaleAmount.length>0?totalSaleAmount[0].totalAmount: 0
        })
    } catch (error) {
        console.log("Error in finding the total amount data", error);
        return res.status(500).json({
            message: "Internal server Errro finding the tota;l amount data!",
            error
        })
    }
}

module.exports.totalSoldItems = async (req, res)=>{
    try {
        const selectedMonth = req.query.month;
        const totalSoldItems = await Product.countDocuments({
            dateOfSale:{
                $gte: new Date(selectedMonth),
                $lte: new Date(new Date(selectedMonth)
                .setMonth(new Date(selectedMonth)
                .getMonth()+1))
            },
            sold: true
        });
        return res.status(200).json({
            message: "Total Sold item",
            totalSoldItems
        })
    } catch (error) {
        console.log("Internal server error in getting total sold items", error);
        return res.status(500).json({
            message: "Internal server error in getting total sold items!",
            error
        })
    }
}

module.exports.totalNotSoldItem = async (req, res)=>{
    try {
        const selectedMonth = req.query.month;
        const totalNotSoldItem = await Product.countDocuments({
            dateOfSale:{
                $gte: new Date(selectedMonth),
                $lt: new Date(new Date(selectedMonth)
                .setMonth(new Date(selectedMonth)
                .getMonth()+1))
            },
            sold: false
        })
        return res.status(200).json({
            message: "Total Not Sold item",
            totalNotSoldItem
        })
    } catch (error) {
        console.log("Internal server error in getting total not sold items", error);
        return res.status(500).json({
            message: "Internal server error in getting total not sold items!",
            error
        })
    }
}

module.exports.getPriceRangeData = async (req, res)=>{
    try {
        const selectedMonth = req.query.month;
        const priceRange = [
            {min:0, max:100},
            {min:101, max:200},
            {min:201, max:300},
            {min:301, max:400},
            {min:401, max:500},
            {min:501, max:600},
            {min:601, max:700},
            {min:701, max:800},
            {min:801, max:900},
            {min:901, max:Infinity},

        ];

        const priceRangeData = await Promise.all(
            priceRange.map(async ({min, max})=>{
                const count = await Product.countDocuments({
                    price: {$gte: min, $lt: max},
                    dateOfSale:{
                        $gte: new Date(selectedMonth),
                        $lt: new Date(new Date(selectedMonth)
                        .setMonth(new Date(selectedMonth)
                        .getMonth()+1))
                    },
                });
                return {priceRange: `${min}-${max}`, count}
            })
        );
        return res.status(200).json({
            message: "Item price range",
            priceRangeData
        })
    } catch (error) {
        console.log("Internal server error in getting price range data", error);
        return res.status(500).json({
            message: "Internal server error in getting price range data!",
            error
        })
    }
}

module.exports.categoryData = async (req, res)=>{
    try {
        const selectedMonth = req.query.month;
        const categoryData = await Product.aggregate([
            {
                $match:{
                    dateOfSale:{
                        $gte: new Date(selectedMonth),
                        $lt: new Date(new Date(selectedMonth)
                        .setMonth(new Date(selectedMonth)
                        .getMonth()+1))
                    }
                }
            },
            {
                $group:{
                    _id: '$category',
                    count: {$sum: 1},
                }
            }
        ])
        return res.status(200).json({
            message: "category Data",
            categoryData
        })
    } catch (error) {
        console.log("Internal server error in getting category data", error);
        return res.status(500).json({
            message: "Internal server error in getting category data!",
            error
        })
    }
}