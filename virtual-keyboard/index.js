const keyboardKeyEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'];
const keyboardKeyRus = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'];
const keyboardKeyEnUp = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Delete', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '▲', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'];
const keyboardKeyRusUp = ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Delete', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '▲', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'];
const keyboardKeyCode = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16, 17, 91, 18, 32, 18, 37, 40, 39, 17];

let isEng = false;
let isUp = false;
let isKeys = false;

const keyboardWrap = document.createElement('div');
keyboardWrap.className = 'keyboard__wrap';
document.body.append(keyboardWrap);

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
keyboardWrap.append(wrapper);

const h1Title = document.createElement('h1');
h1Title.className = 'h1-title';
h1Title.innerText = 'Virtual Keyboard'
wrapper.append(h1Title);

let textarea = document.createElement('textarea');
textarea.name = 'textarea';
textarea.id = 'textarea';
textarea.setAttribute('cols', '70' );
textarea.setAttribute('rows', '15' );
//textarea.setAttribute('autocomplete', 'off' );
//textarea.setAttribute('readonly', 'true' );
//textarea.setAttribute('autofocus', 'true');
wrapper.append(textarea);

const keyboardId = document.createElement('div');
keyboardId.id = 'keyboard';
wrapper.append(keyboardId);

const description = document.createElement('p');
description.className = 'description';
description.innerHTML = 'Клавиатура создана в ОС Linux<br>Для переключения языка: левый ctrl + alt';
wrapper.append(description);

 async function getKeyboardKey() {
    let resEn = await keyboardKeyEn;
    let resRu = await keyboardKeyRus;
    let resEnUp = await keyboardKeyEnUp;
    let resRuUp = await keyboardKeyRusUp;
    let boardKeyCode = await keyboardKeyCode;


     isUp = JSON.parse(localStorage.getItem('kodUp'));
     isEng = JSON.parse(localStorage.getItem('kodEng'));


   if (isEng === true) {
       init(resRu, boardKeyCode);
   } else init(resEn, boardKeyCode);


     document.onkeydown = function (event) {
         document.addEventListener('keydown', (event) => {
             document.querySelector('#keyboard .k-key[data="' + event.keyCode + '"]').classList.add('active');
         })
         if (event.code === 'ControlLeft') isKeys = true;
         if (event.code === 'AltLeft' && isKeys) {
             isKeys = false;
             getResKeyboard(resRu, resEn, boardKeyCode);
         } else if (event.key === 'CapsLock' && isEng === false || event.key === 'Shift' && isEng === false)  {
             getResKeyboardUp(resEnUp, resEn, boardKeyCode);
         } else if (event.key === 'CapsLock' || event.key === 'Shift') {
             getResKeyboardUp(resRuUp, resRu, boardKeyCode);
         }
         localStorage.setItem('kodUp', isUp)
          localStorage.setItem('kodEng', isEng)
     }

     document.addEventListener('keyup', (event) => {
         if (event.key === 'Shift' && isEng === true)  {
             getResKeyboardUp(resRuUp, resRu, boardKeyCode);
         } else if (event.key === 'Shift') {
             getResKeyboardUp(resEnUp, resEn, boardKeyCode);
         }
     })


     document.addEventListener('mousedown' , (element) => {
        let elem = element.target.closest('#keyboard .k-key');

         if (elem.textContent === 'CapsLock' && isEng === false || elem.textContent === 'Shift' && isEng === false) {
             getResKeyboardUp(resEnUp, resEn, boardKeyCode);

         } else if (elem.textContent === 'CapsLock' || elem.textContent === 'Shift') {
             getResKeyboardUp(resRuUp, resRu, boardKeyCode);

         }
     })

     document.addEventListener('mouseup' , (element) => {
         let elem = element.target.closest('#keyboard .k-key');
        // console.log('onkeydown -code:', elem);
         elem.classList.add('active');
         setTimeout(removeActive, 300);

         if (elem.textContent === 'Shift' && isEng === true)  {
             getResKeyboardUp(resRuUp, resRu, boardKeyCode);
         } else if (elem.textContent === 'Shift') {
             getResKeyboardUp(resEnUp, resEn, boardKeyCode);
         }

     })


 }
getKeyboardKey()



//-------- start switch lang -----//
function getResKeyboard(resRu, resEn, boardKeyCode) {
    isEng ?  getResEn(resEn, boardKeyCode) : getResRu(resRu, boardKeyCode);
}

function getResRu(resRu, boardKeyCode) {
    init(resRu, boardKeyCode);
    isEng = true;
}

function getResEn(resEn, boardKeyCode) {
    init(resEn, boardKeyCode);
    isEng = false;
}
//-------- switch lang end -----//

//-------- start switch lang Up -----//
function getResKeyboardUp(resRuUp, resEnUp, boardKeyCode) {
    isUp ?  getResEnUp(resEnUp, boardKeyCode) : getResRuUp(resRuUp, boardKeyCode);

}

function getResRuUp(resRuUp, boardKeyCode) {
    init(resRuUp, boardKeyCode);
    isUp = true;
}

function getResEnUp(resEnUp, boardKeyCode) {
    init(resEnUp, boardKeyCode);
    isUp = false;
}

//-------- switch lang Up end-----//

function init(keyboard, boardKeyCode) {
    let out = '';

        for (let i = 0; i < keyboard.length; i++) {
            if (i === 14 || i === 29 || i === 42 || i === 55) {
                out += `<div class="clearfix"></div>`
            }
            out += '<div class="k-key" data="' +boardKeyCode[i]+ '">' + keyboard[i] + '</div>';
    }
    keyboardId.innerHTML = out;

}



keyboardId.addEventListener('mousedown', (element) => {

    let elem = element.target.closest('#keyboard .k-key');
    //console.log('onkeydown -code:', elem.textContent);
   let text = elem.textContent;
    //textarea.value += text;
    switch (elem.textContent){
        case 'Backspace':
            textarea.value = textarea.value.substr(0,textarea.value.length-1);
            //textarea.value = textarea.value.slice(0, -1);
            break;
        case 'Enter':
            textarea.value += '\n';
            break;
        case 'Delete':

            //textarea.value = textarea.value.substr(0,textarea.value.length-1);
           // textarea.value = textarea.value.slice(0,-1);

            textarea.value = textarea.value.replaceAt((getCaretPos(textarea)-1), " ");
           // textarea.value = textarea.value.substr(0, index) + textarea.value.substr(index + xNumber.length);
           // textarea.focus();
            // textarea.setSelectionRange((getCaretPos(textarea))-1, (getCaretPos(textarea))+1, "forward");

            break;
        case 'Win':
            break;
        case 'Tab':
            textarea.value += '    ';
            break;
        case 'Ctrl':
        case 'Alt':
            break;
        case 'Shift':
            break;
        case 'CapsLock':
            break;
        default:
            textarea.value += text;
    }

})

keyboardId.onmousedown = function () {
    keyboardId.querySelectorAll('#keyboard .k-key').forEach(function (element) {
        element.addEventListener('mousedown', ()=> {

        });
        element.addEventListener('mouseup', () => {
            element.classList.add('active');
            setTimeout(removeActive, 300);

        });
    });
}


document.addEventListener('keyup', removeActive);

    function removeActive() {
        document.querySelectorAll('#keyboard .k-key').forEach(function (element) {
            element.classList.remove('active');
        });

    }


document.addEventListener('keydown', (event) => {
      //console.log(event.type)


    document.querySelector('#keyboard .k-key[data="' + event.keyCode + '"]').classList.add('active');


         let text = document.querySelector('#keyboard .k-key[data="' + event.keyCode + '"]').textContent;
         //console.log(text);
        console.log(textarea.value);
        //textarea.value += text;

        switch (event.keyCode){
            case 8:
                textarea.value = textarea.value.substr(0,textarea.value.length-1);
                //textarea.value = textarea.value.slice(0, -1);
                break;
            case 13:
                textarea.value += '\n';
                break;
            case 46:
                break;
            case 91:
                break;
            case 9:
                textarea.value += '    ';
                break;
            case 17:
            case 18:
                break;
            case 16:
                break;
            case 20:
                break;
            default:

                textarea.value += text;
        }

    });


/*function getCursorPosition( ctrl ) {
    let CaretPos = 0;
    if ( document.selection ) {
        ctrl.focus ();
        let Sel = document.selection.createRange();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    } else if ( ctrl.selectionStart || ctrl.selectionStart === '0' ) {
        CaretPos = ctrl.selectionStart;
    }
    return CaretPos;
}*/

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + this.substr(index + replacement.length);
}


// let str = 'abacaba';
// let index = 2;
// console.log(str.replaceAt(3, "x"));


function getCaretPos(obj) {
    obj.focus();
    if(obj.selectionStart) return obj.selectionStart;
    else if (document.selection) {
        let sel = document.selection.createRange();
        let clone = sel.duplicate();
        sel.collapse(true);
        clone.moveToElementText(obj);
        clone.setEndPoint('EndToEnd', sel);
        return clone.text.length;
    }
    return 0;
}



