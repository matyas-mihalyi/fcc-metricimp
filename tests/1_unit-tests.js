const { expect } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {

  suite('getNum', () => {
    test('should correctly read a whole number input.', () => {
      const input = "1gal";
      const actual = convertHandler.getNum(input);
      const expected = 1;

      assert.equal(actual, expected)
      expect(actual).to.equal(expected);
    });
    test('should correctly read a decimal number input.', () => {
      const input = "1.253gal";
      const actual = convertHandler.getNum(input);
      const expected = 1.253;
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);  
    });
    test('should correctly read a fractional input.', () => {
      const input = "1/2mi";
      const actual = convertHandler.getNum(input);
      const expected = 0.5;
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);  
      
    });
    test('should correctly read a fractional input with a decimal.', () => {
      const input = "1.5/0.5mi";
      const actual = convertHandler.getNum(input);
      const expected = 3;
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);  
    });
    test('should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
      const input = "1.5/5/3mi";
      const actual = () => convertHandler.getNum(input);
      const expected = 'invalid number';
      assert.throws(actual, expected);
      expect(() => actual()).to.throw(expected);  
    });
    test('should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
      const input = "L";
      const actual = convertHandler.getNum(input);
      const expected = 1;
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);  
    });
  });

  suite('getUnit', () => {
    
    test('should correctly read each valid input unit', () => {
      const units = Object.keys(convertHandler.units);
      
      units.forEach(unit => {
        const input = `1.2/3${unit}`;
        const actual = convertHandler.getUnit(input);

        assert.equal(actual, unit)
        expect(actual).to.equal(unit);
      });
    });
    test('should correctly return an error for an invalid input unit', () => {
      const input = `1.2/67nosuchinput`;
      const actual = () => convertHandler.getUnit(input);
      const expected = "invalid unit"
      
      assert.throws(actual, expected);
      expect(() => actual()).to.throw(expected);
    });
    test('should correctly return an error if no input unit is found', () => {
      const input = `1.2/67`;
      const actual = () => convertHandler.getUnit(input);
      const expected = "invalid unit"
      
      assert.throws(actual, expected); 
      expect(() => actual()).to.throw(expected);
    });
  });
  
  suite('getReturnUnit', () => {
    test('should return the correct return unit for each valid input unit.', () => {
      const units = Object.keys(convertHandler.units);
      
      units.forEach(unit => {
        const actual = convertHandler.getReturnUnit(unit);
        const expected = convertHandler.units[unit].pair;
        
        assert.equal(actual, expected)
        expect(actual).to.equal(expected);
      });
    });
  });
  
  suite('spellOutUnit', () => {
    test('should correctly return the spelled-out string unit for each valid input unit.', () => {
      const units = Object.keys(convertHandler.units);
      
      units.forEach(unit => {
        const actual = convertHandler.spellOutUnit(unit);
        const expected = convertHandler.units[unit].spelled;
        
        assert.equal(actual, expected)
        expect(actual).to.equal(expected);
      });
    });
  });

  suite('convert', () => {
    
    let randomNumber = Math.floor(Math.random() * 100);

    test('convertHandler should correctly convert gal to L', () => {
      const inputUnit = 'gal';
      const expected = Number((randomNumber * 3.78541).toFixed(5));
      const actual = convertHandler.convert(randomNumber, inputUnit);
      
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);
    });
    test('convertHandler should correctly convert L to gal', () => {
      const inputUnit = 'L';
      const expected = Number((randomNumber * (1/3.78541)).toFixed(5));
      const actual = convertHandler.convert(randomNumber, inputUnit);
      
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);
    });
    test('convertHandler should correctly convert mi to km', () => {
      const inputUnit = 'mi';
      const expected = Number((randomNumber * 1.60934).toFixed(5));
      const actual = convertHandler.convert(randomNumber, inputUnit);
      
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);
    });
    test('convertHandler should correctly convert km to mi', () => {
      const inputUnit = 'km';
      const expected = Number((randomNumber * (1/1.60934)).toFixed(5));
      const actual = convertHandler.convert(randomNumber, inputUnit);
      
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);
    });
    test('convertHandler should correctly convert lbs to kg', () => {
      const inputUnit = 'lbs';
      const expected = Number((randomNumber * 0.453592).toFixed(5));
      const actual = convertHandler.convert(randomNumber, inputUnit);
      
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);
    });
    test('convertHandler should correctly convert kg to lbs', () => {
      const inputUnit = 'kg';
      const expected = Number((randomNumber * (1/0.453592)).toFixed(5));
      const actual = convertHandler.convert(randomNumber, inputUnit);
      
      assert.equal(actual, expected)
      expect(actual).to.equal(expected);
    });
    
  })
});