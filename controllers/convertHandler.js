
function ConvertHandler() {
  this.units = {
    km: {
      pair: 'mi',
      spelled: 'kilometers',
      multiplier: 1.60934
    },
    mi: {
      pair: 'km',
      spelled: 'miles',
      multiplier: 1 / 1.60934
    },
    lbs: {
      pair: 'kg',
      spelled: 'pounds',
      multiplier: 1 / 0.453592
    },
    kg: {
      pair: 'lbs',
      spelled: 'kilograms',
      multiplier: 0.453592
    },
    L: {
      pair: 'gal',
      spelled: 'liters',
      multiplier: 3.78541
    },
    gal: {
      pair: 'L',
      spelled: 'gallons',
      multiplier: 1 / 3.78541
    },
  }


  // getNum

  this.numInputInvalid = (input = "") => {
    return input.match(/\//g).length > 1 || false
  }

  this.divideFractionalInput = (input = "") => {
    const slashIndex = input.match(/\//).index;
    const letterIndex = input.match(/[a-zA-Z]/).index;
    const dividend = input.substring(0, slashIndex);
    const divisor = input.substring(slashIndex + 1, letterIndex);

    return Number(dividend)/Number(divisor)
  }

  this.isFractionalInput = (input = "") => {
    return /\//.test(input);
  }

  this.handleFractionalInput = (input = "") => {
    if (this.numInputInvalid(input)) {
      throw new Error('invalid number')
    }
    return this.divideFractionalInput(input);
  }

  this.hasNoNumberInput = (input = "") => {
    return !/\d/.test(input)
  }

  this.getNum = function(input) {
    const numberString = input.replace(/[a-zA-Z]/g, "");

    if (this.hasNoNumberInput(input)) {
      return 1
    }

    if (this.isFractionalInput(input)) {
      return this.handleFractionalInput(input);
    }
    
    return Number(numberString);
  };

  // getUnit
  
  this.getUnit = function(input) {
    const result = input.replace(/[^a-zA-Z]/g, "").toLowerCase().replace(/^l$/, "L");
    
    if (this.noInputUnit(result) || this.inputUnitInvalid(result)) {
      throw new Error("invalid unit");
    }

    return result;
  };

  this.noInputUnit = (str = "") => {
    return !/[a-zA-Z]/.test(str);
  }

  this.inputUnitInvalid = (str = "") => {
    return !Object.keys(this.units).includes(str);
  }
  
  // getReturnUnit

  this.getReturnUnit = function(initUnit = "") {
    return this.units[initUnit].pair;
  };
  
  // spellOutUnit
  
  this.spellOutUnit = function(unit = "") {
    return this.units[unit].spelled;
  };

  // convert
  
  this.convert = function(initNum, initUnit) {
    const outUnit = this.getReturnUnit(initUnit); 
    const result = initNum * this.units[outUnit].multiplier;

    return Number(result.toFixed(5));
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.units[initUnit].spelled} converts to ${returnNum} ${this.units[returnUnit].spelled}`;
  };

  this.validateInput = (input = "") => {
    const unit = input.replace(/[^a-zA-Z]/g, "").toLowerCase().replace(/^l$/, "L");
    const unitInvalid = this.inputUnitInvalid(unit);
    const numberInvalid = /\/.*\//g.test(input);

    if (numberInvalid && unitInvalid) {
      throw new Error('invalid number and unit')
    }

  }

}

module.exports = ConvertHandler;
