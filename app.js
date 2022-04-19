
let currentRow = 0;
let currentCol = 0;
let currentWord = ``;
const content3 = document.querySelector('.content3');
const content4 = document.querySelector('.content4'); //keyboardContainer

let str = words[Math.floor(Math.random() * 28)];
let X = Math.floor(Math.random() * (str.length / 5));
X *= 5;
let answer = str.substring(X, X + 5);
let ans2 = answer;
answer = `ADAMX`;
ans2 = answer;
//for currentRow on content3 LETTER ANIM when inputted

let RAT = 0.5; //rotate animation time(s)
let SAT = 0.2; //scaleAnimTime(s)

let wordColors = ["#787C7E", '#C9B458', '#6AAA64'];
function setAnimation(colors) {
  animationDelay(1);
  if (colors == null) { colors = [0, 0, 0, 0, 0]; }
  const currentRowColumns = content3.children[currentRow].children; //divs


  for (let index = 0; index < currentRowColumns.length; index++) {
    currentRowColumns[index].classList.add("input_word_anm");
  }

  setTimeout(() => {
    for (let i = 0; i < currentRowColumns.length; i++) {
      currentRowColumns[i].classList.remove("input_word_anm");
    }
    animationDelay(0);
  }, RAT * 5 * 1000);

  for (let index = 0; index < currentRowColumns.length; index++) {
    setTimeout(() => {
      currentRowColumns[index].style.backgroundColor = wordColors[colors[index]];
      currentRowColumns[index].firstChild.style.color = "white";
    }, index * RAT * 1000);
  }




}



function setScaleAnim(element) {
  element.classList.add('scale_anim');
  setTimeout(() => {
    element.classList.remove('scale_anim');
  }, SAT * 1000);
  return;
}







function animationDelay(x) {
  let childs1 = content3.children;
  for (let i = 0; i < childs1.length; i++) {
    let childs2 = childs1[i].children;
    for (let j = 0; j < childs2.length; j++) {
      childs2[j].style.animationDelay = `${j * RAT * x + 's'}`;
    }
  }
};
animationDelay(0);

var r = document.querySelector(':root');
r.style.setProperty('--color', 'lightblue');
//var rs = getComputedStyle(r);
//"The value of --blue is: " + rs.getPropertyValue('--color')

let keyboardRows = content4.children;
for (let i = 0; i < 3; i++) {
  keyboardRowsC = keyboardRows[i].children;

  for (let j = 0; j < keyboardRowsC.length; j++) {
    if (i == 2 && (j == 0 || j == 9)) { continue; } //ignore enter and delete keys
    keyboardRowsC[j].addEventListener('click', (e) => {

      keyboardRowsC = keyboardRows[i].children;

      keyboardRowsC[j];//this
      if (currentCol != 5) {
        let rows = content3.children;
        rows[currentRow].children[currentCol].firstChild.innerHTML = keyboardRowsC[j].firstChild.innerHTML;
        currentWord = `${currentWord + keyboardRowsC[j].firstChild.innerHTML}`;
        setScaleAnim(rows[currentRow].children[currentCol]);
        currentCol++;
      }
    }, true);
  }

}





function getIndex(char) {
  for (let i = 0; i < words.length; i++) {
    if (words[i][0] == char) {
      return i;
    }
  }
}

function resetCurrentRow() {
  let rows = content3.children;
  let rowsChild = rows[currentRow].children;
  for (let i = 0; i < rowsChild.length; i++) {

    rowsChild[i].firstChild.innerHTML = '';

  }
}


let delEl = document.getElementById('delete');

delEl.addEventListener('click', deleteKey, true)


let enterEl = document.getElementById('enter');


enterEl.addEventListener('click', enterKey, true);

function findAndColorizeKey(char, color) {
  console.log(char);
  console.log('***')
  let rows = content4.children;
  let rowsChild;
  for (let i = 0; i < rows.length; i++) {

    rowsChild = rows[i].children;
    for (let j = 0; j < rowsChild.length; j++) {
      if (rowsChild[j].firstChild.innerHTML == char) {
        //rowsChild[j].style.backgroundColor == `rgb(120, 124, 126)` && color != 0) || color == 0
        rowsChild[j].style.backgroundColor = wordColors[color];
        rowsChild[j].firstChild.style.color = 'white';

        console.log(rowsChild[j].firstChild.innerHTML);
        if (color == 2) {
          console.log(rowsChild[j].style.backgroundColor);

        }
        return;
      }

    }

  }

}

const turkisAlphabet = "ERTYUIOPĞÜASDFGHJKLŞİZCVBNMÖÇ";
document.addEventListener("keydown", (e) => {
  let key = e.key.toUpperCase();

  if (turkisAlphabet.indexOf(key) != -1 && currentCol != 5) {
    let rows = content3.children;
    rows[currentRow].children[currentCol].firstChild.innerHTML = key;
    currentWord = `${currentWord + key}`;
    setScaleAnim(rows[currentRow].children[currentCol]);
    currentCol++;
  }

  if (key == "ENTER") {
    enterKey();
  }
  if (key == "BACKSPACE") {
    deleteKey();
  }

});


function deleteKey() {
  if (currentCol > 0) {
    let currentRows = content3.children;
    let rowsChild = currentRows[currentRow].children;
    rowsChild[currentCol - 1].firstChild.innerHTML = '';
    setScaleAnim(rowsChild[currentCol - 1]);

    currentWord = currentWord.substring(0, currentCol - 1);
    currentCol--;
  }
}
function enterKey() {
  let rows = content3.children;
  let rowsC = rows[currentRow].children;
  for (let i = 0; i < rowsC.length; i++) {
    rowsC[i].style.animation = "";
    rowsC[i].style.animationDelay = "0s";
  }

  if (currentCol == 5) {
    let index = getIndex(currentWord[0]);
    if (words[index].indexOf(currentWord) != -1) {
      let colors = [0, 0, 0, 0, 0];
      for (let i = 0; i < 5; i++) {
        if (ans2[i] == currentWord[i]) {

          colors[i] = 2;
          findAndColorizeKey(currentWord[i], 2);

          ans2 = ans2.split('');
          ans2[i] = '-';
          ans2 = ans2.toString().replaceAll(',', '');
          let a = currentWord.split('');
          console.log(ans2);
        }


      }
      for (let i = 0; i < 5; i++) {

        if (ans2[i] != '-' && ans2.indexOf(currentWord[i]) != -1) {
          colors[i] = 1;
          findAndColorizeKey(currentWord[i], 1);

        }
        else if (ans2[i] != '-') {
          colors[i] = 0;
          findAndColorizeKey(currentWord[i], 0);
        }

      }

      console.log(colors)
      setAnimation(colors);

      currentRow++;
      currentCol = 0;
      currentWord = "";
      ans2 = answer;
    }
    else {
      alert(currentWord);
      resetCurrentRow();
      currentWord = "";
      currentCol = 0;
    }

  }
  else {
    //currentWord is not 5
  }
}