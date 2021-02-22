'use strict';
let form = document.forms.addtask;
let field = form.elements.field;
let btnAdd = form.elements.adduser;
let btnAddForm = form.elements.btnAddForm;

let regular = /[Яа-яЁё]/;
let nameTask = document.querySelector('#nametask');
let descTask = document.querySelector('#desctask');
let data = document.querySelector('#data');
let errorArr = [];
// validateElem - правила валидации инпутов (Название задачи, описание задачи, дата)
const validateElem = (elem)=> {
    if(elem.name === 'nametask'){
       if(!regular.test(elem.value)){
        elem.nextElementSibling.textContent = 'Для ввода используйте только буквы русского алфавита';
        elem.classList.remove('valid') 
        elem.classList.add('novalid')
        errorArr.push(-1)
        } else {
        elem.nextElementSibling.textContent = '';
        elem.classList.remove('novalid') 
        elem.classList.add('valid') 
        errorArr.push(1)
        }
    }
    if(elem.name === 'desctask'){ 
        if(!regular.test(elem.value)){
            elem.nextElementSibling.textContent = 'Для ввода используйте только буквы русского алфавита';
            elem.classList.remove('valid') 
            elem.classList.add('novalid')
            errorArr.push(-1)
            } else {
            elem.nextElementSibling.textContent = '';
            elem.classList.remove('novalid') 
            elem.classList.add('valid')
            errorArr.push(1) 
            }
    }
    if(elem.name === 'ndate'){
        if(elem.value ==''){
            elem.nextElementSibling.textContent = 'Укажите дату';
            elem.classList.remove('valid') 
            elem.classList.add('novalid')
            errorArr.push(-1)
            } else {
            elem.nextElementSibling.textContent = '';
            elem.classList.remove('novalid') 
            elem.classList.add('valid')
            errorArr.push(1)
            }
    }
   
};
function pos(num){
    return num > 0;
}
// валидация инпутов через обработчик события blur
for (let elem of form.elements){
    if( !elem.classList.contains('adduser') 
        && !elem.classList.contains('addform') 
        && !elem.classList.contains('fieldset')){
        elem.addEventListener('blur', ()=> {
        validateElem(elem);
        // проверка массива. если есть значения меньше 0 
        // декативируем кнопку добавления задачи в список
        if(errorArr.every(pos));
        else {
            btnAddForm.setAttribute('disabled','disabled');
            btnAddForm.style.backgroundColor= '#403e3e';
        }
    });                
    }
};

// Проверка инпутов (с name adduser/addform/fieldset) на заполнение нажатием на кнопку submit
form.addEventListener('submit', function(even) {
    even.preventDefault();
        let arr = {
            name: form.elements.nametask.value,
            description: form.elements.desctask.value,
            date: form.elements.ndate.value
        };
        // [ ]
        // localStorage:
        // "key" : "value"
        // "arrs": "[{}, {}, {}, {}, {}]"
        // localStorage.getItem("arrs") -> "[{}, {}, {}, {}]"
        let arrs = JSON.parse(localStorage.getItem("arrs"));
        // [{}, {}, {}, {}]
        arrs = arrs ? arrs : [];
        arrs.push(arr); // [{}, {}, {}, {}, {}]
        localStorage.setItem("arrs", JSON.stringify(arrs));
    
});
// по нажатию на кнопку добавляется текстовое поле textarea для добавления участников
// так как часть функционала не реализована данный объект к валидации и передаче данных не подключен
btnAdd.addEventListener('click',() => {
    let newField = document.createElement('textarea');
    let newP = document.createElement('p');
    newField.setAttribute('placeholder','Введите участников через запятую');
    newField.setAttribute('required','');
    newField.setAttribute('cols',30);
    newField.setAttribute('rows', 8);
    newP.append(newField);
    field.append(newP);
});


