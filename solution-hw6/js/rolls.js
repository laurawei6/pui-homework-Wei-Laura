let cart = [];

const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

// glazing options for rolls
const glazing = {
    options: ["Keep original", "Sugar milk", "Vanilla milk", "Double chocolate"],
    priceAdaptation: [0, 0, 0.5, 1.5],
}

// pack size options for rolls
const packs = {
    options: [1, 3, 6, 12],
    priceAdaptation: [1, 3, 5, 10],
}

class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
    
    totalPrice() {
        //basePrice
        let basePrice = this.basePrice;
        
        let i = glazing.options.indexOf(this.glazing);
        let glazingPrice = parseFloat(glazing.priceAdaptation[i]);

        let j = packs.options.indexOf(this.size);
        let packPrice = parseFloat(packs.priceAdaptation[j]);

        let totalItemPrice = ((basePrice + glazingPrice) * packPrice).toFixed(2);
        return totalItemPrice;
    }
}