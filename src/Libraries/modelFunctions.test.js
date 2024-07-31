const modelFunctions = require('./modelFunctions')

var fakeRandomNumberGenerator = {
  randomValueOne: undefined,
  randomValueTwo: undefined,
  calledWithMinValue: undefined,
  calledWithMaxValue: undefined,
  called: 0,
  generateRandomNo: function (minVal, maxVal) {
    this.called ++
    this.calledWithMinValue = minVal
    this.calledWithMaxValue = maxVal
    if (this.called % 2 !== 0) {
      return this.randomValueOne    }
    else {
      return this.randomValueTwo
    }
  }
}

describe('validateValues given invalid values', () => {
  it.each`
    a | b | c
    ${'blabla'} | ${10} | ${'Minus'}
    ${10} | ${'blabla'} | ${'Minus'}
    ${[1,2]} | ${5} | ${'Minus'}
    ${5} | ${[1,2]} | ${'Minus'}
    ${null} | ${6} | ${'Minus'}
    ${6} | ${null} | ${'Minus'}
    ${undefined} | ${6} | ${'Minus'}
    ${6} | ${undefined} | ${'Minus'}
  `('should throw error including "$c" when minVal is $a and maxVal is $b', ({a, b, c}) => {
    expect(() => {
      modelFunctions.validateValues(a, b, c)
    }).toThrow(`create${c}Question: Value Error`)
  });
});

describe('validateValues given invalid values returns error message relevant to calling function', () => {
  it.each`
    a | b | c
    ${'blabla'} | ${10} | ${'Plus'}
    ${'blabla'} | ${10} | ${'Minus'}
    ${'blabla'} | ${10} | ${'Divide'}
    ${'blabla'} | ${10} | ${'Multiply'}
  `('should throw error including "$c" when minVal is $a and maxVal is $b', ({a, b, c}) => {
    expect(() => {
      modelFunctions.validateValues(a, b, c)
    }).toThrow(`create${c}Question: Value Error`)
  });
});

test('validateValues given invalid values and generateRandomNumber as calling function returns relevant error message', () => {
  expect(() => {
      modelFunctions.validateValues('blabla', 10, 'Random')
    }).toThrow(`generateRandomNo: Value Error`)
});

test('createPlusQuestion returns array with 3 values, with answer as third value', () => {
  fakeRandomNumberGenerator.randomValueOne = 3;
  fakeRandomNumberGenerator.randomValueTwo = 4;
  fakeRandomNumberGenerator.called = 0;
  let questionArray = modelFunctions.createPlusQuestion(1, 10, fakeRandomNumberGenerator);
  let expectedAnswer = fakeRandomNumberGenerator.randomValueOne + fakeRandomNumberGenerator.randomValueTwo;

  expect(questionArray.length).toBe(3);
  expect(questionArray).toStrictEqual([fakeRandomNumberGenerator.randomValueOne, fakeRandomNumberGenerator.randomValueTwo = 4, expectedAnswer]);
});

test('createPlusQuestion given invalid values throws error', () => {
  expect(() => {
     modelFunctions.createPlusQuestion("bla", 10, fakeRandomNumberGenerator)}).toThrow()
  });

test('createMinusQuestion returns array with 3 values, with answer as third value', () => {
  fakeRandomNumberGenerator.randomValueOne = 4;
  fakeRandomNumberGenerator.randomValueTwo = 2;
  fakeRandomNumberGenerator.called = 0;
  let questionArray = modelFunctions.createMinusQuestion(1, 10, fakeRandomNumberGenerator);
  let expectedAnswer = fakeRandomNumberGenerator.randomValueOne - fakeRandomNumberGenerator.randomValueTwo;

  expect(questionArray.length).toBe(3);
  expect(questionArray).toStrictEqual([4, 2, expectedAnswer]);
});

test('createMinusQuestion given invalid values throws error', () => {
  expect(() => {
     modelFunctions.createMinusQuestion("bla", 10, fakeRandomNumberGenerator)}).toThrow()
  });

test('createMinusQuestion where values result in negative answer, makes only 10,000 attempts to create question', () => {
  fakeRandomNumberGenerator.randomValueOne = 2;
  fakeRandomNumberGenerator.randomValueTwo = 4;
  fakeRandomNumberGenerator.called = 0;
  let questionArray = modelFunctions.createMinusQuestion(1, 10, fakeRandomNumberGenerator);

  expect(questionArray.length).toBe(3);
  expect(questionArray).toStrictEqual([2, 4, -2]);
  expect(fakeRandomNumberGenerator.called).toBe(20000);
});

test('createDivideQuestion returns array with 3 values, with answer as third value', () => {
  fakeRandomNumberGenerator.randomValueOne = 8;
  fakeRandomNumberGenerator.randomValueTwo = 2;
  fakeRandomNumberGenerator.called = 0;
  let questionArray = modelFunctions.createDivideQuestion(1, 10, true, fakeRandomNumberGenerator);
  let expectedAnswer = fakeRandomNumberGenerator.randomValueOne / fakeRandomNumberGenerator.randomValueTwo;

  expect(questionArray.length).toBe(3);
  expect(questionArray).toStrictEqual([8, 2, expectedAnswer]);
});

test('createDivideQuestion with restriction uses numbers betweeen 1 and 144 for questions', () => {
  modelFunctions.createDivideQuestion(150, 200, true, fakeRandomNumberGenerator);

  expect(fakeRandomNumberGenerator.calledWithMinValue).toBe(1);
  expect(fakeRandomNumberGenerator.calledWithMaxValue).toBe(144);
});

test('createDivideQuestion without restriction uses numbers from specified range for questions', () => {
  modelFunctions.createDivideQuestion(150, 400, false, fakeRandomNumberGenerator);

  expect(fakeRandomNumberGenerator.calledWithMinValue).toBe(150);
  expect(fakeRandomNumberGenerator.calledWithMaxValue).toBe(400);
});

test('createDivideQuestion where unrestricted values make it impossible to get a whole number answer, makes only 10,000 attempts to create question', () => {
  fakeRandomNumberGenerator.randomValueOne = 150;
  fakeRandomNumberGenerator.randomValueTwo = 200;
  fakeRandomNumberGenerator.called = 0;
  let questionArray = modelFunctions.createDivideQuestion(150, 200, false, fakeRandomNumberGenerator);

  expect(questionArray.length).toBe(3);
  expect(questionArray).toStrictEqual([150, 200, (150/200)]);
  expect(fakeRandomNumberGenerator.called).toBe(20000);
});

test('createDivideQuestion where restricted values make it impossible to get a whole number answer, makes only 10,000 attempts to create question', () => {
  fakeRandomNumberGenerator.randomValueOne = 7;
  fakeRandomNumberGenerator.randomValueTwo = 4;
  fakeRandomNumberGenerator.called = 0;
  let questionArray = modelFunctions.createDivideQuestion(1, 10, true, fakeRandomNumberGenerator);

  expect(questionArray.length).toBe(3);
  expect(questionArray).toStrictEqual([7, 4, (7/4)]);
  expect(fakeRandomNumberGenerator.called).toBe(20000);
});

describe('createDivideQuestion where values make it impossible to get a whole number answer, makes only 10,000 attempts to create question', () => {
  it.each`
    a | b | c
    ${150} | ${200} | ${false}
    ${7} | ${4} | ${true}
  `('value one is $a and value two is $b and restriction status is $c', ({a, b, c}) => {
    fakeRandomNumberGenerator.randomValueOne = a;
    fakeRandomNumberGenerator.randomValueTwo = b;
    fakeRandomNumberGenerator.called = 0;
    let questionArray = modelFunctions.createDivideQuestion(a, b, c, fakeRandomNumberGenerator);

    expect(questionArray.length).toBe(3);
    expect(questionArray).toStrictEqual([a, b, (a/b)]);
    expect(fakeRandomNumberGenerator.called).toBe(20000);
  });
});

test('createMultiplyQuestion returns array with 3 values, with answer as third value', () => {
  fakeRandomNumberGenerator.randomValueOne = 7;
  fakeRandomNumberGenerator.randomValueTwo = 4;
  fakeRandomNumberGenerator.called = 0;
  let questionArray = modelFunctions.createMultiplyQuestion(1, 12, true, fakeRandomNumberGenerator);
  let expectedAnswer = fakeRandomNumberGenerator.randomValueOne * fakeRandomNumberGenerator.randomValueTwo;

  expect(questionArray.length).toBe(3);
  expect(questionArray).toStrictEqual([7, 4, expectedAnswer]);
});

test('createMultiplyQuestion with restriction uses numbers betweeen 1 and 12 for questions', () => {
  modelFunctions.createMultiplyQuestion(150, 200, true, fakeRandomNumberGenerator);

  expect(fakeRandomNumberGenerator.calledWithMinValue).toBe(1);
  expect(fakeRandomNumberGenerator.calledWithMaxValue).toBe(12);
});

test('createMultiplyQuestion without restriction uses numbers from the specified range for questions', () => {
  fakeRandomNumberGenerator.randomValueOne = 3
  fakeRandomNumberGenerator.randomValueTwo = 15
  fakeRandomNumberGenerator.called = 0
  modelFunctions.createMultiplyQuestion(1, 15, false, fakeRandomNumberGenerator);

  expect(fakeRandomNumberGenerator.calledWithMinValue).toBe(1);
  expect(fakeRandomNumberGenerator.calledWithMaxValue).toBe(15);
});
