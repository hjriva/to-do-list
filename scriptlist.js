let list = []
let checklist = []
let i = 0
let subdiv = window.document.getElementById('submit')
let final = window.document.querySelector('input#finaliza')
let divParent = window.document.getElementById('mostraLista') 
const ExtBar = window.document.getElementById('pg')
const pgTxt = window.document.getElementById('pgtxt')
let done = []
const PgBar = window.document.getElementById('pgbar')
const UnderList = window.document.getElementById('botoes')

function PgFunc(a,b) {
    let pgCalc = 100 * (b / a)
    PgBar.style.width = pgCalc + '%'
    if (Number.isInteger(pgCalc)) {
        pgTxt.innerHTML = pgCalc.toLocaleString('pt-BR') + '%' + '(' + done.length + ' de ' + list.length + ')'
    } else if (!Number.isInteger(pgCalc)) {
        pgTxt.innerHTML = pgCalc.toLocaleString('pt-br', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + '%' + '(' + done.length + ' de ' + list.length + ')'
    }
    localStorage.removeItem(`BarPGwid`)
    localStorage.setItem(`BarPGwid`, pgCalc + '%')
}

//ref: https://www.w3resource.com/javascript-exercises/event/javascript-event-handling-exercise-6.php
const dragList = document.getElementById('mostraLista');
let draggedItem = null;
dragList.addEventListener('dragstart', handleDragStart);
dragList.addEventListener('dragover', handleDragOver);
dragList.addEventListener('drop', handleDrop);

function handleDragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', draggedItem.innerHTML);
    event.target.style.opacity = '0.5';
}
  
function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    const targetItem = event.target;
    if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
        let clss = window.document.getElementsByClassName('drag-item')
        for (let c = 0; c <= clss.length; c++) {
            clss[c].style.margin = '6px'
        }
    }
}

function handleDrop(event) {
    event.preventDefault();
    const targetItem = event.target;
    if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
        if (event.clientY > targetItem.getBoundingClientRect().top + (targetItem.offsetHeight / 2)) {
            targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
        } 
        else {
            targetItem.parentNode.insertBefore(draggedItem, targetItem);
        }
    } 
    else if (targetItem.getAttribute('id') == 'mostraLista') {
        let clss = window.document.getElementsByClassName('drag-item')
        for (c=0, calc=0; calc <= event.clientY; c++) {
            calc = clss[c].getBoundingClientRect().top
            if (calc >= event.clientY) {
                dragList.insertBefore(draggedItem, dragList.children[c])
            }
        }
    }   
    if (window.document.getElementById(`item${draggedItem.getAttribute('id')}`).checked) {
        dragList.addEventListener('dragend', function updateArray() {
            const listItems = document.querySelectorAll('.done');
            done.splice = (0, done.length)
            listItems.forEach(item => {
                done.push(item);
            });
        });
    }
    
    targetItem.style.borderTop = '';
    targetItem.style.borderBottom = '';
    draggedItem.style.opacity = '';
    draggedItem = null;
    
    let clss = window.document.getElementsByClassName('drag-item')
    for (let c = 0; c <= clss.length; c++) {
        clss[c].style.margin = 'initial'
    }
}

//adaptado do chat gpt
dragList.addEventListener('dragend', function updateArrayList() {
    const listItems = document.querySelectorAll('.itemlist');
    checklist = [];
    for (let c = 0; c < listItems.length; c++) {
        checklist.push(listItems[c]);
        localStorage.removeItem(`saved${c}`)
        if (listItems[c].checked) {
            localStorage.setItem(`saved${c}`, JSON.stringify(true))
        }
    }
})

dragList.addEventListener('dragend', function updateArrayCheckList() {
    let listItems = document.querySelectorAll('.allitems');
    list = [];
    for (let c = 0; c < listItems.length; c++) {
        list.push(listItems[c].innerText);
    }
    const listasalva = JSON.parse(localStorage.getItem('savedlistjson'))
    if (listasalva !== null)  {
        localStorage.setItem('savedlistjson', null)
        localStorage.removeItem('savedlistjson')
        localStorage.setItem('savedlistjson', JSON.stringify(list))
    } 
});

dragList.addEventListener('dragend', () => {
    updateArray('.itemlist', checklist)
})

dragList.addEventListener('dragend', () => {
    updateArray('.allitems', list)
});

function MainFunc(itemvalue, booleanValue, addFunc) {
    let checkitem = document.createElement('input');
    checkitem.type = 'checkbox';
    checkitem.className = 'itemlist';
    checkitem.setAttribute('id', `item${i}`);
    checkitem.checked = booleanValue
    checklist.push(checkitem)
    let lblcont = itemvalue
    list.push(lblcont);
    let nwlbl = document.createElement('label'); 
    nwlbl.innerText = lblcont;
    nwlbl.className = 'allitems'
    nwlbl.setAttribute('for', `item${i}`);
    nwlbl.setAttribute('id', `lbl${i}`);
    let container = document.createElement('li');
    container.className = 'drag-item'
    container.setAttribute('id', `${i}`)
    container.setAttribute('draggable', 'true')
    let undo = document.createElement('div');
    undo.textContent = '          x';
    undo.className = 'delete';
    checkitem.addEventListener('click', function () {
        if (this.checked) {
            localStorage.removeItem(`saved${checklist.indexOf(checkitem)}`)
            localStorage.setItem(`saved${checklist.indexOf(checkitem)}`, JSON.stringify(true))
            nwlbl.classList.add('done')
            undo.style.color = 'grey'
            done.push(checkitem)
            PgFunc(list.length, done.length) 
            undo.style.display = 'none'
            //alert('check ' + checklist.indexOf(checkitem))
        }
        else if (!this.checked) {
            
            localStorage.setItem(`saved${checklist.indexOf(checkitem)}`, JSON.stringify(false))
            done.splice(`${done.indexOf(checkitem)}`, 1)
            nwlbl.classList.remove('done')
            nwlbl.classList.add('undone')
            undo.style.color = 'black'
            PgFunc(list.length, done.length) 
            undo.style.display = 'initial'
        }      
    })
    undo.addEventListener('click', function() {
        if (checkitem.checked) {
            localStorage.removeItem(`saved${checklist.indexOf(checkitem)}`)
            done.splice(`${done.indexOf(checkitem)}`, 1)
        }
        list.splice(`${checklist.indexOf(checkitem)}`, 1)
        checkitem.remove()
        nwlbl.remove()
        undo.remove()
        let cond = list.length
        for (let vi=checklist.indexOf(checkitem)+1; vi <= cond ; vi++) {
            if (checklist[vi].checked) {
                localStorage.removeItem(`saved${vi}`)
                localStorage.setItem(`saved${vi-1}`, JSON.stringify(true))
            } 
        } 
        checklist.splice(`${checklist.indexOf(checkitem)}`, 1)
        PgFunc(list.length, done.length)  
    })
    divParent.appendChild(container);
    container.appendChild(checkitem);
    container.appendChild(nwlbl);
    container.appendChild(undo);
    i++ 
    if (list.length > 1) {
        final.style.display = 'block';
        ExtBar.style.display = 'block'
        pgTxt.style.display = 'block'
        let pgCalc = 100 * (done.length / list.length)
        if (Number.isInteger(pgCalc)) {
            pgTxt.innerHTML = pgCalc.toLocaleString('pt-BR') + '%' + '(' + done.length + ' de ' + list.length + ')'
        } else if (!Number.isInteger(pgCalc)) {
            pgTxt.innerHTML = pgCalc.toLocaleString('pt-br', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + '%' + '(' + done.length + ' de ' + list.length + ')'
        }
    }
    if (checkitem.checked) {
        nwlbl.classList.add('done')
        undo.style.color = 'grey'
    } 
    else if (!checkitem.checked) {
        nwlbl.classList.add('undone')
        undo.style.color = 'black'
    }
    addFunc
    document.querySelector('input#descr').value = ''
}

window.document.querySelector('input#add').addEventListener('click', function () {MainFunc(window.document.querySelector('input#descr').value, false), PgFunc(list.length, done.length)})

let editar = document.createElement('input')
editar.type = 'button'
editar.value = 'editar lista'
let excluir = document.createElement('input')
excluir.type = 'button'
excluir.value = 'excluir lista'
excluir.setAttribute('id', 'removelist')

function UndoDisplay(disp1, disp2) {
    let d = window.document.getElementsByClassName('delete')
    let il = window.document.getElementsByClassName('itemlist')
    c = 0
    while (c <= d.length) {
        if (il[c].checked) {
            d[c].style.display = disp1
        } else if (!il[c].checked) {
            d[c].style.display = disp2
        }
        c++
    }
}

function OngoingList() {
    localStorage.setItem('savedlistjson', JSON.stringify(list))
    final.style.display = 'none'
    subdiv.style.display = 'none'
    UnderList.appendChild(editar)
    UnderList.appendChild(excluir)
    editar.style.display = 'block'
    ExtBar.style.display = 'block'
    excluir.style.display = 'block'
    UndoDisplay('none', 'none')
}

final.addEventListener('click', function () {OngoingList()})
     
editar.addEventListener('click', function() {
    this.style.display = 'none'
    final.style.display = 'inherit'
    subdiv.style.display = 'inherit'
    UndoDisplay('none', 'initial') 
})

excluir.addEventListener('click', function () {
    localStorage.removeItem('savedlistjson')
    localStorage.setItem('savedlistjson', null)
    localStorage.clear()
    divParent.innerHTML = ''
    subdiv.style.display = 'initial'
    excluir.style.display = 'none'
    editar.style.display = 'none'
    list.splice(0, list.length)
    done.splice(0, done.length)
    checklist.splice(0, checklist.length) 
    window.document.getElementById('pgbar').style.width = '0'
    final.style.display = 'none'
    ExtBar.style.display = 'none'
    localStorage.removeItem(`BarPGwid`)
    localStorage.setItem(`BarPGwid`, '0')
    pgTxt.innerHTML = ''
})

const listasalva = JSON.parse(localStorage.getItem('savedlistjson'))
if (listasalva !== null) {
    alert(listasalva.length)
    window.document.getElementById('pgbar').style.width = localStorage.getItem('BarPGwid')
    let co = 0
    while (listasalva.length > co) {
        var result = JSON.parse(localStorage.getItem(`saved${co}`))
        if (result == true) {
            done.push(localStorage.getItem(`saved${co}`))
        }
        MainFunc(listasalva[i], result)
        co++
    }
    OngoingList()
}
        
        