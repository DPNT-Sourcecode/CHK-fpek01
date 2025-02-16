"use strict";

//noinspection JSUnusedLocalSymbols
module.exports = function(skus) {
  if (typeof skus !== "string" || !skus.match(/^[A-E]*$/)) {
    return -1;
  }


  const priceMap = {
    A: 50,
    B: 30,
    C: 20,
    D: 15,
    E: 40
  };


  const itemCount = {};

  for (const item of skus) {
    itemCount[item] = (itemCount[item] || 0) + 1;
  }
  let total = 0;

  if (itemCount['A']) {
    let countA = itemCount['A'];

    const fiveAOffers = Math.floor(countA / 5);
    total += fiveAOffers * 200;
    countA = countA % 5;
    

    const threeAOffers = Math.floor(countA / 3);
    total += threeAOffers * 130;
    countA = countA % 3;

    total += countA * priceMap['A'];

  }
  
  if (itemCount['E']) {
     total += itemCount['E'] * priceMap['E'];

     if (itemCount['E'] >=2 && itemCount['B'] > 0) {
        const freeBCount = Math.floor(itemCount['E'] / 2);
        itemCount['B'] = Math.max(0, itemCount['B'] - freeBCount);
     }

  }

  if (itemCount['B']) {

    const countB = itemCount['B'];
    const twoBOffers = Math.floor(countB / 2);
    const remainingB = countB % 2;

    total += twoBOffers * 45;
    total += remainingB * priceMap['B'];
  }

  ['C', 'D'].forEach(item => {
    if (itemCount[item]) {
      total += itemCount[item] * priceMap[item];
    }
  });


  return total;
};





