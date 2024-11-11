const config = require('nbased/util/config');

const getProductPrice = async (client, productsInfo) => {

    const pointsDiscount = 200;

    let creditCardType = client.creditCard.creditCard;
    console.log("creditCardType => ", creditCardType);

    const products = productsInfo.products.map(data => {
        let amount = 0;
        const promo = creditCardType === 'Classic' ? 0.08 : 0.12;
        const price = data.price - (data.price * promo);
        amount += price;
        data.final_price = price;
        return { data, amount };
    });

    let totalAmount = 0;

    for (let i = 0; i < products.length; i++) {
        totalAmount += products[i].data.final_price;
    }
    const points = Math.round(totalAmount / pointsDiscount);
    client.points = client.points + points;

    return { products, client };

}



module.exports = { getProductPrice };