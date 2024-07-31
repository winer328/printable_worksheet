import React, { useState } from 'react'
import { displayError, generateAnswersheetView, generateWorksheetView, printWorksheet } from './../Libraries/viewFunctions'
import { generateWorksheetQuestions, validateValues  } from './../Libraries/modelFunctions'
import teacher from './../img/teacher.jpg'
import student from './../img/student.jpg'

function MathWorkSheet() {

  // Default checkbox
  const [isImageFlagChecked, setIsImageFlagChecked] = useState(true);
  const [isAnswerFlag, setIsAnswerFlag] = useState(true);
  // const [isMultiplicationChecked, setIsMultiplicationChecked] = useState(true);
  // const [isDivisionChecked, setIsDivisionChecked] = useState(true);

  var onChangeUserImage = () => {
	if(isImageFlagChecked) {
		document.getElementById('teacher').style.display = "none";
		document.getElementById('student').style.display = "none";
	}
	else {
		document.getElementById('teacher').style.display = "block";
		document.getElementById('student').style.display = "block";
	}
	setIsImageFlagChecked(!isImageFlagChecked);
  }

  var onChangeAnswerFlag = () => {
	// if(isAnswerFlag) document.getElementById('answersheet_section').style.display = "none";
	// else document.getElementById('answersheet_section').style.display = "block";
	setIsAnswerFlag(!isAnswerFlag);
  }

  let randomNumberGenerator = {
	  generateRandomNo: function (minNum, maxNum) {
		  validateValues(minNum, maxNum, 'Random')
		  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
	  }
  }

  var countQuestions = () => {
	  let totalQuestions = 0
	  let worksheetSections = document.querySelectorAll('.worksheet-section')
	  worksheetSections.forEach((worksheetSection) => {
		  if (worksheetSection.children[7].value !== "") {
			  totalQuestions += parseInt(worksheetSection.children[7].value)
		  }
	  })
	  return totalQuestions
  }

  var validateInput = () => {
	  let message = ''
	  let totalQuestions = countQuestions()
	  let worksheetSections = document.querySelectorAll('.worksheet-section')
	  let negNosMessageFlag = false
	  let nosRequiredFlag = false
	  let digitsOnlyFlag = false
	  let noOfQuestionsFlag = false
	  let minGreaterThanMaxFlag = false
	  let operandErrorFlag = false
	  let maxQuestions = 28

	  worksheetSections.forEach((worksheetSection) => {
		  if (worksheetSection.querySelectorAll('input')[0].value < 0 ||
			  worksheetSection.querySelectorAll('input')[1].value < 0 ||
			  worksheetSection.querySelectorAll('input')[2].value < 0) {
			  negNosMessageFlag = true
		  }

		  if (worksheetSection.querySelectorAll('input')[0].value === '' ||
			  worksheetSection.querySelectorAll('input')[1].value === '') {
			  nosRequiredFlag = true
		  }

		  if (!worksheetSection.querySelectorAll('input')[0].value.match(/^\d+$/) ||
			  !worksheetSection.querySelectorAll('input')[1].value.match(/^\d+$/) ||
			  !worksheetSection.querySelectorAll('input')[2].value.match(/^\d+$/)) {
			  digitsOnlyFlag = true
		  }

		  if (worksheetSection.querySelectorAll('input')[2].value === '') {
			  noOfQuestionsFlag = true
		  }

		  if (parseInt(worksheetSection.querySelectorAll('input')[0].value) >=
			  parseInt(worksheetSection.querySelectorAll('input')[1].value)) {
			  minGreaterThanMaxFlag = true
		  }

		  if (!worksheetSection.querySelector('select').value.match(/^[+-×÷]$/) &&
			  worksheetSection.querySelector('select').value !== "All") {
			  operandErrorFlag = true
		  }
	  })

	  message += negNosMessageFlag ? 'Negative numbers cannot be entered into the form. ' : ''
	  message += nosRequiredFlag ? 'A minimum number and maximum number are required. ' : ''
	  message += digitsOnlyFlag ? 'Only numbers can be entered in the form. ' : ''
	  message += noOfQuestionsFlag ? 'Please enter a number of questions. ' : ''
	  message += minGreaterThanMaxFlag ? 'Minimum number cannot be greater than or equal to maximum number. ' : ''
	  message += operandErrorFlag ? 'Operand error. ' : ''

	  if (totalQuestions > maxQuestions) {
		  message += `${maxQuestions} is the maximum number of questions that will fit on the page.`
	  }

	  return message
  }

  var onClickGenerate = () => {
	if (validateInput()) {
		displayError(validateInput())
	} else {
		let noOfQuestions = countQuestions()
		document.querySelector('.error-message').style.display = 'none'
		document.querySelector('.error-message').textContent = ''

		let questions = generateWorksheetQuestions(randomNumberGenerator)
		document.getElementById('worksheet').innerHTML = generateWorksheetView(questions)
		document.getElementById('answersheet').innerHTML = generateAnswersheetView(questions)

		document.getElementById('totalPossibleScore').innerText = `/ ${noOfQuestions}`

		document.querySelector('.print').addEventListener('click', (e) => {
			e.stopImmediatePropagation()
			printWorksheet()
		})

		document.querySelector('.unhide-settings').addEventListener('click', (e) => {
			e.stopImmediatePropagation()
			document.querySelector('form').style.display = 'block'
			document.querySelector('.unhide-settings').style.display = 'none'
		})

		document.querySelector('form').style.display = 'none'
		document.querySelector('.unhide-settings').style.display = 'block'
		document.querySelector('.hidden-control-container').style.display = 'block'
		document.querySelector('main').style.display = 'block'
		document.querySelector('section').style.display = 'block'
		if(isImageFlagChecked === true) {
			document.querySelector('main img').style.display = 'block'
		} else {
			document.querySelector('main img').style.display = 'none'
		}
		if(isAnswerFlag === true) {
			document.getElementById('answersheet_section').style.display = 'block'
		} else {
			document.getElementById('answersheet_section').style.display = 'none'
		}
	}
  }

  var onClickAddSection = () => {
	document.querySelector('.error-message').textContent = ""
	document.querySelector('.error-message').style.display = "none"

	let newElement = document.createElement('div')
	newElement.setAttribute("class", "worksheet-section")

	let newSection = `<label>Min No: </label><input type="number" step="1" min="0" />
					<label>Max No: </label><input type="number" step="1" min="0" />
					<label>Operand:</label>
					<select>
						<option>+</option>
						<option>-</option>
						<option>&#215;</option>
						<option>&#247;</option>
						<option>All</option>
					</select>
					<label >No. of Questions: </label><input type="number" step="1" min="0" />
					<div class="button delete float-right">Delete</div>`

	newElement.innerHTML = newSection

	document.getElementById('worksheetSectionSettings').appendChild(newElement)

	let lastSection = document.querySelectorAll('.worksheet-section').length - 1

	document.querySelectorAll('.worksheet-section')[lastSection].children[7].addEventListener('change', () => {
		let noOfQuestions = countQuestions()
		document.getElementById('noOfQuestionsDisplay').textContent = noOfQuestions
	})

	document.querySelectorAll('.worksheet-section')[lastSection].children[8].addEventListener('click', (e) => {
		if (document.querySelectorAll('.worksheet-section').length === 1) {
			displayError('Cannot delete the last section')
		} else {
			e.currentTarget.parentElement.remove()
			let noOfQuestions = countQuestions()
			document.getElementById('noOfQuestionsDisplay').textContent = noOfQuestions
		}
	})
  }

  var onClickSendAnswer = () => {

  }

  return (
	<>
	  <header>
		  <div className="hidden-control-container">
			  <div className="button unhide-settings float-left">Unhide Settings</div>
			  <div className="button print float-right">Print</div>
		  </div>
		  <form>
			  <div>
				  <a onClick={onClickAddSection} className="button add-section float-left">Add Section</a>
				  <input type="reset" className="button delete float-left" value="Clear" />
				  <a onClick={onClickGenerate} className="button generate float-right">Generate Worksheet</a>
			  </div>

			  <div id="worksheetSectionSettings">
				  <div className="worksheet-section">
					  <label>Min No: </label><input type="number" step="1" min="0"/>
					  <label>Max No: </label><input type="number" step="1" min="0"/>
					  <label>Operand:</label>
					  <select>
						  <option>+</option>
						  <option>-</option>
						  <option>&#215;</option>
						  <option>&#247;</option>
						  <option>All</option>
					  </select>
					  <label> Count of Questions: </label><input type="number" step="1" min="0" />
					  {/*<div className="button delete float-right">Delete</div>*/}
				  </div>
			  </div>

			  <div id="customAnswer">
				  <label>The answer is:&nbsp;</label><input type="text" id="customAnswerText"
					  placeholder="Write the answer to your custom question here." />
			  </div>
			  <div>
				  <input type="checkbox" id="imageFlag" checked={isImageFlagChecked} onChange={onChangeUserImage} /><label htmlFor="imageFlag">Display interesting image</label>
			  </div>
			  <div>
				  <input type="checkbox" id="answerFlag" checked={isAnswerFlag} onChange={onChangeAnswerFlag} /><label htmlFor="answerFlag">Display answer sheet</label>
			  </div>

			  <div>
				  <div id ="noOfQuestions" className="inline float-right">Count of Questions: <span id="noOfQuestionsDisplay">0</span> (max <span id ="maxQuestionsDisplay">28</span>)</div>
			  </div>
		  </form>

		  <div className="error-message"></div>
	  </header>
	  <main>
		  <img id="student" alt="NoStudentImg" src={student} />
		  <h1>Maths Worksheet</h1>
		  <div>Date:</div>
		  <div id="worksheet"></div>
		  <div className="scoreBox">
			  <a onClick={onClickSendAnswer} className="button send-answer float-left">Send Answer</a>
			  <div className="answerBoxSection">
			  	<div className="customAnswerBoxTitle">Score: </div>
				  <div className="answerBox"></div>
				  <div id="totalPossibleScore">/&nbsp;</div>
			  </div>
		  </div>
	  </main>
	  <section id="answersheet_section">
		  <img id="teacher" alt="NoTeacherImg" src={teacher} />
		  <h1>Answer Sheet</h1>
		  <div id="answersheet"></div>
		  <div id="customAnswerBox">
			  <div className="questionNumber"></div>
			  <div className="customAnswer"></div>
		  </div>
	  </section>
	</>
  )
}

export default MathWorkSheet