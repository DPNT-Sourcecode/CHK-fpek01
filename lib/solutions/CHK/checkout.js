'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    // Input validation
    if (typeof skus !== 'string' || !skus.match(/^[A-D]*$/)) {
        return -1;
    }

    // Price table
    const priceMap = {
        'A': 50,
        'B': 30,
        'C': 20,
        'D': 15
    };

    // Special discountPriceMap
    const discountPriceMap = {
        'A': { itemCount: 3, price: 130 },
        'B': { itemCount: 2, price: 45 }
    };

    // Count items
    const itemCount = {};
    for (const item of skus) {
        itemCount[item] = (itemCount[item] || 0) + 1;
    }

    // Calculate total
    let total = 0;
    for (const item in itemCount) {
        const count = itemCount[item];
        
        if (discountPriceMap[item]) {
            // Apply special discountPriceMap
            const offer = discountPriceMap[item];
            const offerCount = Math.floor(count / offer.itemCount);
            const remainingCount = count % offer.itemCount;
            
            total += (offerCount * offer.price) + (remainingCount * priceMap[item]);
        } else {
            // Regular price
            total += count * priceMap[item];
        }
    }

    return total;
};
