const wrapperDict = document.querySelector('.app-wrapper');
const wordElem = document.querySelector('.word');
const btnElem = document.querySelector('.btn');

const word = JSON.parse(localStorage.getItem('dictionary'));

function createDictionary(words){
    for (let i=0; i<words.length; i++){
        const word =document.createElement('p');
        word.innerText = words[i];
        wordElem.append(word);
        const btn = document.createElement('button');
        btn.innerText = 'Удалить';
        btnElem.append(btn);
    }
}

createDictionary(word);

btnElem.addEventListener('click', function(element){
    w = element.target;
    w.remove();
    const oldChild =  wordElem.removeChild( wordElem.firstChild ); 
});


// function get_element() {
//     wordElem.innerHTML = localStorage.getItem('dictionary');
// }

