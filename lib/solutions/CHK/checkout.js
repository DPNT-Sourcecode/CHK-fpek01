'use strict';


module.exports = function (skus) {
    if (typeof skus !== 'string' || !skus.match(/^[A-Z]*$/)) {
        return -1;
    }

    const priceMap = {
        'A': 50, 
        'B': 30, 
        'C': 20,
        'D': 15, 
        'E': 40, 
        'F': 10,
        'G': 20, 
        'H': 10, 
        'I': 35, 
        'J': 60, 
        'K': 70, 
        'L': 90,
        'M': 15, 
        'N': 40, 
        'O': 10, 
        'P': 50, 
        'Q': 30, 
        'R': 50,
        'S': 20, 
        'T': 20, 
        'U': 40, 
        'V': 50, 
        'W': 20, 
        'X': 17,
        'Y': 20, 
        'Z': 21
    };

    const multiItemOffers = {
        'A': [[5, 200], [3, 130]],
        'B': [[2, 45]],
        'H': [[10, 80], [5, 45]],
        'K': [[2, 120]],
        'P': [[5, 200]],
        'Q': [[3, 80]],
        'V': [[3, 130], [2, 90]]
    };

    const buyXGetYFree = {
        'E': { buy: 2, freeItem: 'B', freeQty: 1 },
        'F': { buy: 2, freeItem: 'F', freeQty: 1 },
        'N': { buy: 3, freeItem: 'M', freeQty: 1 },
        'R': { buy: 3, freeItem: 'Q', freeQty: 1 },
        'U': { buy: 3, freeItem: 'U', freeQty: 1 }
    };

    const groupDiscounts = {
        'STXYZ': { size: 3, price: 45, itemPrice: 20 }
    };

    const itemCount = {};
    for (const item of skus) {
        itemCount[item] = (itemCount[item] || 0) + 1;
    }

    let total = 0;


    const freeItems = {};
    Object.entries(buyXGetYFree).forEach(([item, offer]) => {
        if (itemCount[item]) {
            if (offer.freeItem === item) {
                const totalItems = itemCount[item];
                const paidItems = Math.ceil(totalItems * offer.buy / (offer.buy + offer.freeQty));
                itemCount[item] = paidItems;
            } else if (itemCount[offer.freeItem]) {
                const freeCount = Math.floor(itemCount[item] / offer.buy) * offer.freeQty;
                freeItems[offer.freeItem] = (freeItems[offer.freeItem] || 0) + freeCount;
            }
        }
    });

   
    Object.entries(freeItems).forEach(([item, count]) => {
        if (itemCount[item]) {
            itemCount[item] = Math.max(0, itemCount[item] - count);
        }
    });

    Object.entries(groupDiscounts).forEach(([group, offer]) => {
        const items = group.split('');
        let groupItems = [];
        let groupItemCounts = {};
        let totalGroupItems = 0;

        items.forEach(item => {
            if (itemCount[item]) {
                totalGroupItems += itemCount[item];
                groupItemCounts[item] = itemCount[item];
            }
        });

        
        if (totalGroupItems >= offer.size) {
            
            items.forEach(item => {
                if (itemCount[item]) {
                    for (let i = 0; i < itemCount[item]; i++) {
                        groupItems.push(item);
                    }
                    delete itemCount[item];
                }
            });
            
           
            groupItems.sort((a, b) => priceMap[b] - priceMap[a]);
            
            const groupSets = Math.floor(groupItems.length / offer.size);
            const remainingItems = groupItems.length % offer.size;
            
            if (groupSets > 0) {
                total += groupSets * offer.price;
            }
            
            if (remainingItems > 0) {
              
                for (let i = groupSets * offer.size; i < groupItems.length; i++) {
                    total += priceMap[groupItems[i]];
                }
            }
        }
    });


    Object.entries(itemCount).forEach(([item, count]) => {
        if (count > 0) {
            if (multiItemOffers[item]) {
                let remainingCount = count;
                const offers = [...multiItemOffers[item]].sort((a, b) => b[0] - a[0]);
                
                while (remainingCount > 0) {
                    let offerApplied = false;
                    for (const [quantity, price] of offers) {
                        if (remainingCount >= quantity) {
                            const sets = Math.floor(remainingCount / quantity);
                            total += sets * price;
                            remainingCount = remainingCount % quantity;
                            offerApplied = true;
                            break;
                        }
                    }
                    if (!offerApplied) {
                        total += remainingCount * priceMap[item];
                        break;
                    }
                }
            } else {
                total += count * priceMap[item];
            }
        }
    });

    return total;
};