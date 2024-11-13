// let string="";
// let buttons=document.querySelectorAll('.button');

// // Function to check if a character is an operator
// function isOperator(char) {
//     return ['+', '-', '*', '/', '%'].includes(char);
// }

// Array.from(buttons).forEach((button)=>{
//     button.addEventListener('click',(e)=>{
//         if(e.target.innerHTML== '='){
//             string=eval(string);
//             document.querySelector('input').value=string;
//         }
//         else if(e.target.innerHTML == "C"){
//             string="";
//             document.querySelector('input').value=string;
//         }
//         else if(e.target.innerHTML =="M+"){
//             string=string.slice(0,-1);
//             document.querySelector('input').value= string;

//         }
//         else{

//             if(isOperator(e.target.innerHTML) && isOperator(string.slice(-1))){
//                 return;
//             }
            
//             string=string+e.target.innerHTML;
//             document.querySelector('input').value = string;

//         } 

//     })
// })


let string = "";
let buttons = document.querySelectorAll('.button');
let inputField = document.querySelector('input');
let calculated = false; 

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}


function handleInput(value) {
    if (value === '=') {
        try {
            string = eval(string).toString() || "";
        } catch (error) {
            string = "Error";
        }
        inputField.value = string;
        calculated = true; 
    } else if (value === 'C') {
        string = "";
        inputField.value = string;
        calculated = false; 
    } else if (value === 'M+') {
        string = string.slice(0, -1);
        inputField.value = string;
    } else {
        // If a number is entered after '=', start fresh
        if (calculated && !isOperator(value)) {
            string = value;
            calculated = false; 
        } else {
            if (calculated && isOperator(value)) {
                calculated = false; 
            }
            
            if (!(isOperator(value) && isOperator(string.slice(-1)))) {
                string += value;
            }
        }
        inputField.value = string;
    }
}

// Add click event listener for each button
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

// Add keyboard event listener for keyboard input
document.addEventListener('keydown', (e) => {
    let key = e.key;

    if (!isNaN(key) || isOperator(key) || key === '.' || key === 'Enter' || key === 'Backspace') {
        e.preventDefault();

        if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Backspace') {
            handleInput('M+'); 
        } else {
            handleInput(key);
        }
    }
});
