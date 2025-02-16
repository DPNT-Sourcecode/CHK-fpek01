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

    // Calculate total
    let total = 0;

    // Handle E's effect on B
    if (itemCount['E'] >= 2 && itemCount['B'] > 0) {
        const freeBCount = Math.floor(itemCount['E'] / 2);
        itemCount['B'] = Math.max(0, itemCount['B'] - freeBCount);
    }

    // Handle item A with multiple offers (5A for 200, 3A for 130)
    if (itemCount['A']) {
        const countA = itemCount['A'];
        const fiveAOffers = Math.floor(countA / 5);
        let remainingA = countA % 5;
        
        total += fiveAOffers * 200;

        const threeAOffers = Math.floor(remainingA / 3);
        remainingA = remainingA % 3;

        total += threeAOffers * 130;
        total += remainingA * priceMap['A'];
    }

    // Handle item B with 2B for 45 offer
    if (itemCount['B']) {
        const countB = itemCount['B'];
        const twoBOffers = Math.floor(countB / 2);
        const remainingB = countB % 2;

        total += twoBOffers * 45;
        total += remainingB * priceMap['B'];
    }

    // Handle item E
    if (itemCount['E']) {
        total += itemCount['E'] * priceMap['E'];
    }

    // Handle regular priced items (C, D, E)
    ['C', 'D', 'E'].forEach(item => {
        if (itemCount[item]) {
            total += itemCount[item] * priceMap[item];
        }
    });

    return total;
};