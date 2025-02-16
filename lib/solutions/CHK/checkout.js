'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    // Input validation
    if (typeof skus !== 'string' || !skus.match(/^[A-D]*$/)) {
        return -1;
    }

    // Price table
    const prices = {
        'A': 50,
        'B': 30,
        'C': 20,
        'D': 15
    };

    // Special offers
    const offers = {
        'A': { quantity: 3, price: 130 },
        'B': { quantity: 2, price: 45 }
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
        
        if (offers[item]) {
            // Apply special offers
            const offer = offers[item];
            const offerCount = Math.floor(count / offer.quantity);
            const remainingCount = count % offer.quantity;
            
            total += (offerCount * offer.price) + (remainingCount * prices[item]);
        } else {
            // Regular price
            total += count * prices[item];
        }
    }

    return total;
};