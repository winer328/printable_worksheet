const viewFunctions = require('./viewFunctions')

const validQuestionsArray = [
    { x: 2, y: 5, operand: "&#215;", boxPos: 3, answer: 10 },
    { x: 2, y: 7, operand: "+", boxPos: 4, answer: 9 },
    { x: 9, y: 9, operand: "&#247;", boxPos: 5, answer: 1 },
    { x: 8, y: 3, operand: "-", boxPos: 2, answer: 5 },
    { x: 7, y: 1, operand: "&#247;", boxPos: 1, answer: 7 },
]

describe('generateWorksheetView given invalid values', () => {
    it.each`
        a
        ${'blabla'}
        ${10}
        ${null}
        ${undefined}
        `('should throw error (invalid value $a)', ({a}) => {
            expect(() => {
            viewFunctions.generateWorksheetView(a)
            }).toThrow()
        });
    });

test('generateWorksheetView given valid input returns expected HTML', () => {
    let worksheetHTML = viewFunctions.generateWorksheetView(validQuestionsArray);

    let expectedHTML = '<div class="questionContainer"><div class="question"><div class="questionNumber">Q1.</div><div>2</div><div>&nbsp;&#215;&nbsp;</div><div>5</div><div>&nbsp;=&nbsp;</div><div class="answerBox"></div><div class="tickBox"></div></div></div>';
    expectedHTML += '<div class="questionContainer"><div class="question"><div class="questionNumber">Q4.</div><div>2</div><div>&nbsp;+&nbsp;</div><div>7</div><div>&nbsp;=&nbsp;</div><div class="answerBox"></div><div class="tickBox"></div></div></div>';
    expectedHTML += '<div class="questionContainer"><div class="question"><div class="questionNumber">Q2.</div><div>9</div><div>&nbsp;&#247;&nbsp;</div><div>9</div><div>&nbsp;=&nbsp;</div><div class="answerBox"></div><div class="tickBox"></div></div></div>';
    expectedHTML += '<div class="questionContainer"><div class="question"><div class="questionNumber">Q5.</div><div>8</div><div>&nbsp;-&nbsp;</div><div class="answerBox"></div><div>&nbsp;=&nbsp;</div><div>5</div><div class="tickBox"></div></div></div>';
    expectedHTML += '<div class="questionContainer"><div class="question"><div class="questionNumber">Q3.</div><div class="answerBox"></div><div>&nbsp;&#247;&nbsp;</div><div>1</div><div>&nbsp;=&nbsp;</div><div>7</div><div class="tickBox"></div></div></div>';

    expect(worksheetHTML).toBe(expectedHTML);
});

describe('generateAnswersheetView given invalid values', () => {
    it.each`
        a
        ${'blabla'}
        ${10}
        ${null}
        ${undefined}
        `('should throw error (invalid value $a)', ({a}) => {
            expect(() => {
            viewFunctions.generateAnswersheetView(a)
            }).toThrow()
        });
    });

test('generateAnswersheetView given valid input returns expected HTML', () => {
    let answersheetHTML = viewFunctions.generateAnswersheetView(validQuestionsArray);

    let expectedHTML = '<div class="questionContainer"><div class="question"><div class="questionNumber">Q1.</div><div>2</div><div>&nbsp;&#215;&nbsp;</div><div>5</div><div>&nbsp;=&nbsp;</div><div class="answerBox">10</div></div></div>';
    expectedHTML += '<div class="questionContainer"><div class="question"><div class="questionNumber">Q4.</div><div>2</div><div>&nbsp;+&nbsp;</div><div>7</div><div>&nbsp;=&nbsp;</div><div class="answerBox">9</div></div></div>';
    expectedHTML += '<div class="questionContainer"><div class="question"><div class="questionNumber">Q2.</div><div>9</div><div>&nbsp;&#247;&nbsp;</div><div>9</div><div>&nbsp;=&nbsp;</div><div class="answerBox">1</div></div></div>';
    expectedHTML += '<div class="questionContainer"><div class="question"><div class="questionNumber">Q5.</div><div>8</div><div>&nbsp;-&nbsp;</div><div class="answerBox">3</div><div>&nbsp;=&nbsp;</div><div>5</div></div></div>';
    expectedHTML += '<div class="questionContainer"><div class="question"><div class="questionNumber">Q3.</div><div class="answerBox">7</div><div>&nbsp;&#247;&nbsp;</div><div>1</div><div>&nbsp;=&nbsp;</div><div>7</div></div></div>';

    expect(answersheetHTML).toBe(expectedHTML);
});
