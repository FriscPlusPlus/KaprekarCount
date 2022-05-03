class KaprekarCount {
  constructor() {}
  _getDesc(number) {
    const aNumbers = number.split('');
    const aSorted = aNumbers.sort();
    const aReversed = aSorted.reverse();
    const sReversed = aReversed.join(',');
    return parseInt(sReversed.replaceAll(',', ''));
  }
  _getAsc(number) {
    const aNumbers = number.split('');
    const aSorted = aNumbers.sort();
    const sSorted = aSorted.join(',');
    return parseInt(sSorted.replaceAll(',', ''));
  }

  _isValid(number) {
    const sNumber = number.toString();
    const numberReworked = Array.from(new Set(sNumber.split(''))).toString();
    return numberReworked.length !== 1;
  }

  _leadingZero(number) {
    const aNumbers = number.split('');
    const aSorted = aNumbers.sort();
    return aSorted[0] === '0';
  }

  _getConstantToUse(number) {
    if (!this._isValid(number))
      throw new Error(
        'This process fails for numbers made of repeating integers such as 1111 or 333 ecc. https://en.wikipedia.org/wiki/Kaprekar%27s_routine'
      );
    if (this._leadingZero(number)) {
      throw new Error(
        "No number with leading 0 allowed, i don't have time for a solution sorry"
      );
    }
    if (number.length === 3) return 495;
    if (number.length === 4) return 6174;
    throw new Error('Only numbers with 3 or 4 digits are allowed');
  }

  cycle(number) {
    let cycles = [];
    const sNumber = number.toString();
    const Kaprekar = this._getConstantToUse(sNumber);
    let desc = this._getDesc(sNumber);
    let asc = this._getAsc(sNumber);
    let diff = desc - asc;
    while (diff !== Kaprekar) {
      cycles.push(diff);
      desc = this._getDesc(diff.toString());
      asc = this._getAsc(diff.toString());
      diff = desc - asc;
    }
    return cycles;
  }

  cycleCount(number) {
    return this.cycle(number).length;
  }
}

module.exports = KaprekarCount;
