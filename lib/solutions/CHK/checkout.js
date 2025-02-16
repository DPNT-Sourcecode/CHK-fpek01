"use strict";

//noinspection JSUnusedLocalSymbols
module.exports = function(skus) {
  if (typeof skus !== "string" || !skus.match(/^[A-Z]*$/)) {
    return -1;
  }

  const priceMap = {
    A: 50,
    B: 30,
    C: 20,
    D: 15,
    E: 40,
    F: 10,
    G: 20,
    H: 10,
    I: 35,
    J: 60,
    K: 80,
    L: 90,
    M: 15,
    N: 40,
    O: 10,
    P: 50,
    Q: 30,
    R: 50,
    S: 30,
    T: 20,
    U: 40,
    V: 50,
    W: 20,
    X: 90,
    Y: 10,
    Z: 50,
  };

  const multiItemOffers = {
   'A' : [[5, 200], [3, 130]],
   'B' : [[2, 45]],
   'H' : [[10, 80], [5, 45]],
   'K' : [[2, 150]],
   'P' : [[5, 200]],
   'Q' : [[3, 80]],
   'V' : [[3, 130], [2, 90]],
  }


  const buyXGetYFree = {
      'E': { buy: 2, freeItem: 'B', freeQty: 1 },
      'F': { buy: 2, freeItem: 'F', freeQty: 1 },
      'N': { buy: 3, freeItem: 'M', freeQty: 1 },
      'R': { buy: 3, freeItem: 'Q', freeQty: 1 },
      'U': { buy: 3, freeItem: 'U', freeQty: 1 },

  }

  const itemCount = {};
  for (const item of skus) {
    itemCount[item] = (itemCount[item] || 0) + 1;
  }

  let total = 0;

  return total;

};


