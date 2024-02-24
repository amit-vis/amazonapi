
const staticsController = require('./statics');

// code for get all combined data
module.exports.combinedData = async (req, res)=>{
    try {
        const selectedMonth = req.query.month;

        const totalSaleAmount = await fetch(`http://localhost:5000/statics/total-sale-amount?month=${selectedMonth}`);
        const totalSaleAmountdata = await totalSaleAmount.json();

        const totalNotSoldItem = await fetch(`http://localhost:5000/statics/total-notsold-item?month=${selectedMonth}`);
        const totalNotSoldItemData = await totalNotSoldItem.json();

        const totalSoldItems = await fetch(`http://localhost:5000/statics/total-sold-item?month=${selectedMonth}`);
        const totalSoldItemsData = await totalSoldItems.json();

        const priceRange = await fetch(`http://localhost:5000/statics/price-range-data?month=${selectedMonth}`);
        const priceRangeData = await priceRange.json();

        const category = await fetch(`http://localhost:5000/statics/category-data?month=${selectedMonth}`);
        const categoryData = await category.json();
        const combineData ={
            totalSaleAmountdata,
            totalNotSoldItemData,
            totalSoldItemsData,
            priceRangeData,
            categoryData
        }
        return res.status(200).json({
            message: "All combined data!",
            combineData,
        });
    } catch (error) {
        console.log("Internal server error in finding combined data", error);
        return res.status(500).json({
            message: "Internal server error in finding combined data",
            error
        })
    }
}

