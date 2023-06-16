const { getProductById } = require("./productsControllers");

const stockUpdateDb = async (customer) => {
    const Items = JSON.parse(customer.metadata.cart);
    //console.log(Items);

    for(let i = 0; i < Items.length; i++){
        const product = await getProductById(Items[i].id);
        //console.log(product);
        if(product){
            product.stock -= Items[0].cartAmount;
            await product.save();
        }
    }
}

module.exports = { stockUpdateDb };