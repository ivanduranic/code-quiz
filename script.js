var javaQuestions = [
    {
        question: "What are variables used for in JavaScript Programs?",
        answers: {
            a: 'Storing numbers, dates, or other values',
            b: 'Varying randomly',
            c: 'Causing high-school algebra flashbacks'
        },
        correctAnswer: 'a'
    },
    
    {
        question: "Which of the following are capabilities of functions in JavaScript?",
        answers: {
            a: 'Return a value3',
            b: 'Accept parameters and Return a value',
            c: 'Accept parameters'
        },
        correctAnswer: 'c'
    },
    {
        question: "Which of the following is not a valid JavaScript variable name?",
        answers: {
            a: '2names',
            b: '_first_and_last_names',
            c: 'FirstAndLast'
        },
        correctAnswer: 'a'
    },
    {
        question: "JavaScript entities start with _______ and end with _________.",
        answers: {
            a: 'Ampersand, semicolon',
            b: 'Semicolon, colon',
            c: 'Colon, ampersand'
        },
        correctAnswer: 'a'
    },
    {
        question: "Choose the server-side JavaScript object?",
        answers: {
            a: 'FileUpLoad',
            b: 'Function',
            c: 'File'
        },
        correctAnswer: 'c'
    }
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(javaQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        
        var output = [];
        var answers;
        
        for(var i=0; i<questions.length; i++){
            
            answers = [];

            for(letter in questions[i].answers){

                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        var userAnswer = '';
        var numCorrect = 0;
        
        for(var i=0; i<questions.length; i++){

            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
                
                answerContainers[i].style.color = 'lightgreen';
            }
            else{
                answerContainers[i].style.color = 'red';
            }
        }

        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    showQuestions(questions, quizContainer);
    
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}