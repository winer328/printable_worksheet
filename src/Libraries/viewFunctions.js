function generateWorksheetView(questions) {
    let worksheetHTML = ''

    questions.forEach((question, key) => {
        let questionHTML = '<div class="questionContainer"><div class="question">'
        let questionNumber = 0
        if ((key + 1) %2 === 0) {
            questionNumber = (key) + Math.ceil(questions.length/2) - Math.floor(key/2)
        } else {
            questionNumber = (key+1) - Math.floor(key/2)
        }

        questionHTML += `<div class="questionNumber">Q${questionNumber}.</div>`

        if(question.boxPos === 1) {
            questionHTML += '<div class="answerBox"><input type="number" class="answerBoxInput" step="1" /></div>'
        } else {
            questionHTML += `<div>${question.x}</div>`
        }

        questionHTML += `<div>&nbsp;${question.operand}&nbsp;</div>`

        if(question.boxPos === 2) {
            questionHTML += '<div class="answerBox"><input type="number" class="answerBoxInput" step="1" /></div>'
        } else {
            questionHTML += `<div>${question.y}</div>`
        }

        questionHTML += '<div>&nbsp;=&nbsp;</div>'

        if(question.boxPos > 2) {
            questionHTML += '<div class="answerBox"><input type="number" class="answerBoxInput" step="1" /></div>'
        } else {
            questionHTML += `<div>${question.answer}</div>`
        }

        questionHTML += '<div class="tickBox"></div></div></div>'
        worksheetHTML += questionHTML
    })

    return worksheetHTML
}

function generateAnswersheetView(questions) {
    let answersheetHTML = ''

    questions.forEach((question, key) => {
        let questionHTML = '<div class="questionContainer"><div class="question">'
        let questionNumber = 0
        if ((key + 1) %2 === 0) {
            questionNumber = (key) + Math.ceil(questions.length/2) - Math.floor(key/2)
        } else {
            questionNumber = (key+1) - Math.floor(key/2)
        }

        questionHTML += `<div class="questionNumber">Q${questionNumber}.</div>`

        if(question.boxPos === 1) {
            questionHTML += `<div class="answerBox">${question.x}</div>`
        } else {
            questionHTML += `<div>${question.x}</div>`
        }

        questionHTML += `<div>&nbsp;${question.operand}&nbsp;</div>`

        if(question.boxPos === 2) {
            questionHTML += `<div class="answerBox">${question.y}</div>`
        } else {
            questionHTML += `<div>${question.y}</div>`
        }

        questionHTML += '<div>&nbsp;=&nbsp;</div>'

        if(question.boxPos > 2) {
            questionHTML += `<div class="answerBox">${question.answer}</div>`
        } else {
            questionHTML += `<div>${question.answer}</div>`
        }

        questionHTML += '</div></div>'
        answersheetHTML += questionHTML
    })

    return answersheetHTML
}

function printWorksheet () {
    window.print();
}

function displayError (errorMessage) {
    document.querySelector('.error-message').textContent = errorMessage
    document.querySelector('.error-message').style.display = "block"

    setTimeout(function() {
        document.querySelector('.error-message').style.display = "none"
        document.querySelector('.error-message').textContent = ""
    }, 5000)
}

module.exports = {
    displayError,
    generateAnswersheetView,
    generateWorksheetView,
    printWorksheet,
}
