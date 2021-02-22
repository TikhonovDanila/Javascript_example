'use strict';
let arrs = JSON.parse(localStorage.getItem('arrs'));
let forma = document.forms.form1;
let del = forma.elements.delete;

// добавляем задачи из Localstorage----------------
function getDiv(arrs) {
    let table = document.querySelector("table");
    table.classList.add('table_sort');
    let tbody = document.querySelector('tbody');
    let forArrs = jQuery('.listtask');
    if (!arrs){
        forArrs.before('<h2>Ни одной задачи не добавлено</h2>');
        return;
    }
    forArrs.before('<h2>Все задачи</h2>');
    let elements;
    for (elements of arrs){
        let tr = document.createElement("tr");
        
        for (let elem in elements ){
            let td = document.createElement('td')
            td.innerText = elements[elem];
            tr.append(td);
        }
        tbody.append(tr);
    } 
    table.append(tbody);
}
getDiv(arrs);
//-------------------------------------------------------

// При клике на строку TR  с задачей присваивается id=green.
// строка выделяется и заливается зеленым,
// при нажатии на кнопку удаление присваивается значение 
// display=none. Можно выбрать и удалить все строки сразу.
let trs = document.querySelectorAll('tbody > tr');
for (let tr of trs){
    console.log(tr)
    tr.addEventListener('click', function(){
    tr.setAttribute('id','green');
    })
} 

del.addEventListener('click', function(){
    for (let tr of trs){
        if(tr.hasAttribute('id')){
            tr.style.display = 'none';
        }
    }
})
//------------------------------------------------

// сортировка по нажатию на название столбцов (название, описание, дата)
document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );
        
        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
        
            cell.classList.toggle('sorted', cell === target);
    };
    
    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
    
});
//--------------------------------------