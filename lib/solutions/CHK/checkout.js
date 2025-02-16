"use strict";

//noinspection JSUnusedLocalSymbols
module.exports = function(skus) {
  if (typeof skus !== "string" || !skus.match(/^[A-D]*$/)) {
    return -1;
  }


  const priceMap = {
    A: 50,
    B: 30,
    C: 20,
    D: 15,
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
  

  return total;
};


