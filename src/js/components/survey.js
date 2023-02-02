document.addEventListener('DOMContentLoaded', () => {
	const surveyForm = document.querySelector('.survey__form')
	if(!surveyForm) return

	const submitBtn = surveyForm.querySelector('.survey__submit-btn')
	const questionList = document.querySelectorAll('.question-list__elem')

	submitBtn.addEventListener('click', (e) => {
		e.preventDefault()
		let hasFormError = false;

		questionList.forEach((question) => {
			const answerList = question.querySelectorAll('.question__input')
			const hasAnswer = Array.from(answerList).some((answer) => answer.checked)
			if(!hasAnswer) {
				question.classList.add('question-list__elem--error')
				surveyForm.classList.add('survey__form--has-error')
				hasFormError = true
			}
		})

		if(hasFormError) {
			submitBtn.disabled = true
		}
		else {
			surveyForm.submit()
		}
	})

	// Remove question error
	const labelList = document.querySelectorAll('.question__label')
	labelList.forEach((label) => {
		label.addEventListener('click', () => {
			const question = label.closest('.question-list__elem')
			question.classList.remove('question-list__elem--error')
			checkFormForError()
		})
	})

	// Remove form error
	const checkFormForError = () => {
		const errorQuestionList = surveyForm.querySelectorAll('.question-list__elem--error')
		console.log(errorQuestionList.length)
		if(!errorQuestionList.length) {
			surveyForm.classList.remove('survey__form--has-error')
			submitBtn.disabled = false
		}
	}

	// Scroll to the first question without answer
	const scrollToFirstError = document.querySelector('.survey__error-scroll')
	scrollToFirstError.addEventListener('click', (e) => {
		e.preventDefault()
		const firstError = surveyForm.querySelector('.question-list__elem--error')
		if(firstError) {
			firstError.scrollIntoView({
				behavior: 'smooth'
			})
		}
	})

})
