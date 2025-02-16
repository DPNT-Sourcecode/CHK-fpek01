'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    // Input validation
    if (typeof skus !== 'string' || !skus.match(/^[A-Z]*$/)) {
        return -1;
    }

    // Price table
    const priceMap = {
        'A': 50, 'B': 30, 'C': 20, 'D': 15, 'E': 40, 'F': 10,
        'G': 20, 'H': 10, 'I': 35, 'J': 60, 'K': 80, 'L': 90,
        'M': 15, 'N': 40, 'O': 10, 'P': 50, 'Q': 30, 'R': 50,
        'S': 30, 'T': 20, 'U': 40, 'V': 50, 'W': 20, 'X': 90,
        'Y': 10, 'Z': 50
    };

    // Special offers table
    const multiItemOffers = {
        'A': [[5, 200], [3, 130]],  // 5A for 200, 3A for 130
        'B': [[2, 45]],             // 2B for 45
        'H': [[10, 80], [5, 45]],   // 10H for 80, 5H for 45
        'K': [[2, 150]],            // 2K for 150
        'P': [[5, 200]],            // 5P for 200
        'Q': [[3, 80]],             // 3Q for 80
        'V': [[3, 130], [2, 90]]    // 3V for 130, 2V for 90
    };

    const buyXGetYFree = {
        'E': { buy: 2, freeItem: 'B', freeQty: 1 },     // 2E get one B free
        'F': { buy: 2, freeItem: 'F', freeQty: 1 },     // 2F get one F free
        'N': { buy: 3, freeItem: 'M', freeQty: 1 },     // 3N get one M free
        'R': { buy: 3, freeItem: 'Q', freeQty: 1 },     // 3R get one Q free
        'U': { buy: 3, freeItem: 'U', freeQty: 1 }      // 3U get one U free
    };

    // Count items
    const itemCount = {};
    for (const item of skus) {
        itemCount[item] = (itemCount[item] || 0) + 1;
    }

    let total = 0;

    // Handle buy X get Y free offers first
    Object.entries(buyXGetYFree).forEach(([item, offer]) => {
        if (itemCount[item]) {
            // Add the price for all items of this type
            total += itemCount[item] * priceMap[item];
            
            // Calculate free items
            if (itemCount[offer.freeItem]) {
                const freeCount = Math.floor(itemCount[item] / offer.buy) * offer.freeQty;
                itemCount[offer.freeItem] = Math.max(0, itemCount[offer.freeItem] - freeCount);
            }
        }
    });

    // Handle multi-item offers
    Object.entries(multiItemOffers).forEach(([item, offers]) => {
        if (itemCount[item]) {
            let count = itemCount[item];
            
            // Sort offers by quantity in descending order to apply largest bundles first
            offers.sort((a, b) => b[0] - a[0]);
            
            // Apply each offer
            offers.forEach(([quantity, price]) => {
                const numOffers = Math.floor(count / quantity);
                total += numOffers * price;
                count = count % quantity;
            });
            
            // Add remaining items at regular price
            total += count * priceMap[item];
        }
    });

    // Handle regular priced items
    Object.entries(priceMap).forEach(([item, price]) => {
        if (itemCount[item] && 
            !multiItemOffers[item] && 
            !buyXGetYFree[item]) {
            total += itemCount[item] * price;
        }
    });

    return total;
};
