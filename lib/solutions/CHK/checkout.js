'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    // Input validation
    if (typeof skus !== 'string' || !skus.match(/^[A-E]*$/)) {
        return -1;
    }

    // Price table
    const priceMap = {
        'A': 50,
        'B': 30,
        'C': 20,
        'D': 15,
        'E': 40
    };

    // Count items
    const itemCount = {};
    for (const item of skus) {
        itemCount[item] = (itemCount[item] || 0) + 1;
    }

    let total = 0;

    // Handle A special offers first (5A for 200, 3A for 130)
    if (itemCount['A']) {
        let countA = itemCount['A'];
        
        // Apply 5A offer first
        const fiveAOffers = Math.floor(countA / 5);
        total += fiveAOffers * 200;
        countA = countA % 5;
        
        // Then apply 3A offer to remaining
        const threeAOffers = Math.floor(countA / 3);
        total += threeAOffers * 130;
        countA = countA % 3;
        
        // Finally add any remaining individual A's
        total += countA * priceMap['A'];
    }

    // Handle E and its effect on B
    if (itemCount['E']) {
        // Add E's price
        total += itemCount['E'] * priceMap['E'];
        
        // Apply E's effect on B
        if (itemCount['E'] >= 2 && itemCount['B'] > 0) {
            const freeBCount = Math.floor(itemCount['E'] / 2);
            itemCount['B'] = Math.max(0, itemCount['B'] - freeBCount);
        }
    }

    // Handle remaining B with special offer (2B for 45)
    if (itemCount['B']) {
        const countB = itemCount['B'];
        const twoBOffers = Math.floor(countB / 2);
        const remainingB = countB % 2;

        total += twoBOffers * 45;
        total += remainingB * priceMap['B'];
    }

    // Handle regular priced items (C, D)
    ['C', 'D'].forEach(item => {
        if (itemCount[item]) {
            total += itemCount[item] * priceMap[item];
        }
    });

    return total;
};
