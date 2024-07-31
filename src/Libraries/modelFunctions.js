function generateWorksheetQuestions(randomNumberGenerator) {
    let questions = [];

    let worksheetSections = document.querySelectorAll('.worksheet-section')
    let multiplicationRestricted = /*document.getElementById('multiplicationRestrictionFlag').checked ===*/ false;
    let divisionRestricted = /*document.getElementById('divisionRestrictionFlag').checked ===*/ false;

    worksheetSections.forEach((worksheetSection) => {
        let minVal=parseInt(worksheetSection.children[1].value)
        let maxVal=parseInt(worksheetSection.children[3].value)

        let noOfQuestions = parseInt(worksheetSection.children[7].value)
        let operandChoice = worksheetSection.children[5].value

        for (let i=0; i < noOfQuestions; i++)
        {
            let operand

            if(operandChoice === 'All') {
                let random = randomNumberGenerator.generateRandomNo(1,4)
                switch (random) {
                    case 1:
                        operand = '+'
                        break
                    case 2:
                        operand = '-'
                        break
                    case 3:
                        operand = '&#215;'
                        break
                    default:
                        operand = '&#247;'
                }
            } else {
                operand = operandChoice
            }

            operand = operand == '×' ? operand = '&#215;' : operand
            operand = operand == '÷' ? operand = '&#247;' : operand

            let x, y
            let boxPos = randomNumberGenerator.generateRandomNo(1,5)
            let answer
            let checkedQuestion
            switch(operand) {
                case '+':
                    checkedQuestion = createPlusQuestion(minVal, maxVal, randomNumberGenerator)
                    x = checkedQuestion[0]
                    y = checkedQuestion[1]
                    answer = checkedQuestion[2]
                    break
                case '-':
                    checkedQuestion = createMinusQuestion(minVal, maxVal, randomNumberGenerator)
                    x = checkedQuestion[0]
                    y = checkedQuestion[1]
                    answer = checkedQuestion[2]
                    break
                case '&#215;':
                    checkedQuestion = createMultiplyQuestion(minVal, maxVal, multiplicationRestricted, randomNumberGenerator)
                    x = checkedQuestion[0]
                    y = checkedQuestion[1]
                    answer = checkedQuestion[2]
                    break
                case '&#247;':
                    checkedQuestion = createDivideQuestion(minVal, maxVal, divisionRestricted, randomNumberGenerator)
                    x = checkedQuestion[0]
                    y = checkedQuestion[1]
                    answer = checkedQuestion[2]
                    break
                default:
                    answer='opps'
                    break
            }

            questions.push({ x, y, operand, boxPos, answer })
        }
    })

    return questions;
}

function createPlusQuestion(minVal, maxVal, randomNumberGenerator){
    validateValues(minVal, maxVal, "Plus");

    let x, y, checkedQuestion = [];
    x = randomNumberGenerator.generateRandomNo(minVal, maxVal);
    y = randomNumberGenerator.generateRandomNo(minVal, maxVal);

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x + y
    return checkedQuestion
}

function createMinusQuestion(minVal, maxVal, randomNumberGenerator) {
    validateValues(minVal, maxVal, "Minus");
    
    let x, y, checkedQuestion = [];
    let timeOut = 0;

    do {
        timeOut ++
        x = randomNumberGenerator.generateRandomNo(minVal, maxVal)
        y = randomNumberGenerator.generateRandomNo(minVal, maxVal)
    } while((x-y) < 0 && timeOut < 10000)

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x - y
    return checkedQuestion
}

function createMultiplyQuestion(minVal, maxVal, restricted = true, randomNumberGenerator) {
    validateValues(minVal, maxVal, "Multiply");
    
    let x, y, checkedQuestion = []

    if (restricted) {
            minVal = minVal > 12 ? 1 : minVal;
            maxVal = maxVal > 12 ? 12 : maxVal;
            x = randomNumberGenerator.generateRandomNo(minVal, maxVal)
            y = randomNumberGenerator.generateRandomNo(minVal, maxVal)
    } else {
        x = randomNumberGenerator.generateRandomNo(minVal, maxVal)
        y = randomNumberGenerator.generateRandomNo(minVal, maxVal)
    }

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x * y
    return checkedQuestion
}

function createDivideQuestion(minVal, maxVal, restricted = true, randomNumberGenerator) {
    validateValues(minVal, maxVal, "Divide");
    
    let x, y, checkedQuestion = []

    minVal = minVal === 0 ? 1: minVal;

    let timeOut = 0;

    if (restricted){
        maxVal = maxVal > 144 ? 144 : maxVal;
        minVal = minVal > 144 ? 1 : minVal;

        do {
            x = randomNumberGenerator.generateRandomNo(minVal, maxVal);
            y = randomNumberGenerator.generateRandomNo(minVal, maxVal);
            timeOut ++
        } while ((x%y != 0 || Math.min(x, y) > 12 || (x/y) > 12) && timeOut < 10000);
    } else {
        do {
            x = randomNumberGenerator.generateRandomNo(minVal, maxVal);
            y = randomNumberGenerator.generateRandomNo(minVal, maxVal);
            timeOut++;
        } while (x%y != 0 && timeOut < 10000);
    }    

    checkedQuestion[0] = x
    checkedQuestion[1] = y
    checkedQuestion[2] = x / y
    return checkedQuestion
}

function validateValues(minVal, maxVal, questionType) {
    let functionName = `create${questionType}Question`;

    if (questionType === 'Random') {
        functionName = 'generateRandomNo';
    }

    if (minVal === null || maxVal === null || minVal === undefined || maxVal === undefined) {
        throw new Error (`${functionName}: Value Error`);
    }

    if (!minVal.toString().match(/^\d+$/) || !maxVal.toString().match(/^\d+$/)) {
        throw new Error(`${functionName}: Value Error`);
    }
}

module.exports = {
    createPlusQuestion,
    createMinusQuestion,
    createDivideQuestion,
    createMultiplyQuestion,
    validateValues,
    generateWorksheetQuestions,
}
