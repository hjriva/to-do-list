window.document.getElementById('currentcolor').addEventListener('click', function () {
    let optionalColors = window.document.getElementById('optcolors')
    optionalColors.style.display == 'none' ? optionalColors.style.display = 'grid' : optionalColors.style.display = 'none'
})

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
        pgTxt.innerHTML = pgCalc.toLocaleString('pt-BR') + '%' + ' (' + done.length + ' de ' + list.length + ')'
    } else if (!Number.isInteger(pgCalc)) {
        pgTxt.innerHTML = pgCalc.toLocaleString('pt-br', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + '%' + ' (' + done.length + ' de ' + list.length + ')'
    }
    localStorage.removeItem(`BarPGwid`)
    localStorage.setItem(`BarPGwid`, pgCalc + '%')
}
//adaptado do chat gpt
document.querySelector('.tooltip').addEventListener('mouseover', function(event) {
    const tooltip = this.querySelector('.tooltiptext');
    if (matchMedia('only screen and (max-width: 1300px)').matches) {
    tooltip.style.left = `calc(${localStorage.getItem(`BarPGwid`)} - 10px)`
    } else {
    tooltip.style.left = `calc(${localStorage.getItem(`BarPGwid`)} - 60px)`;
}
});



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
            clss[c].style.margin = '3.5px'
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
    
    //targetItem.style.borderTop = '';
    //targetItem.style.borderBottom = '';
    /*draggedItem.style.opacity = '1';
    draggedItem = null;


    let clss = window.document.getElementsByClassName('drag-item')
    for (let c = 0; c <= clss.length; c++) {
        clss[c].style.margin = '0px 3.5px 0px 3.5px'
    }*/
}

dragList.addEventListener('dragend', function () {
    draggedItem.style.opacity = '1';
    draggedItem = null;

    let clss = window.document.getElementsByClassName('drag-item')
    for (let c = 0; c <= clss.length; c++) {
        clss[c].style.margin = '0px 3.5px 0px 3.5px'
    }

})
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
    let checkedLabel = document.createElement('label')
    checkedLabel.classList.add('checkmarked')
    let spanCheck = document.createElement('span')
    spanCheck.classList.add('check')
    nwlbl.innerText = lblcont;
    nwlbl.className = 'allitems'
    nwlbl.setAttribute('for', `item${i}`);
    nwlbl.setAttribute('id', `lbl${i}`);
    let container = document.createElement('li');
    container.className = 'drag-item'
    container.setAttribute('id', `cont${i}`)
    container.setAttribute('draggable', 'true')
    let undo = document.createElement('div');
    undo.textContent = 'x';
    undo.classList.add('delete');
    checkitem.addEventListener('click', function () {
        if (this.checked) {
            localStorage.removeItem(`saved${checklist.indexOf(checkitem)}`)
            localStorage.setItem(`saved${checklist.indexOf(checkitem)}`, JSON.stringify(true))
            nwlbl.classList.add('done')
            undo.style.color = 'grey'
            done.push(checkitem)
            PgFunc(list.length, done.length) 
            undo.style.display = 'none'
        }
        else if (!this.checked) {
            
            localStorage.setItem(`saved${checklist.indexOf(checkitem)}`, JSON.stringify(false))
            done.splice(`${done.indexOf(checkitem)}`, 1)
            nwlbl.classList.remove('done')
            nwlbl.classList.add('undone')
            undo.style.color = 'var(--linhas)'
            PgFunc(list.length, done.length) 
            if (subdiv.style.display !== 'none') {
                undo.style.display = 'inline'
            }
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
        container.remove()
        let cond = list.length
        for (let vi=checklist.indexOf(checkitem)+1; vi <= cond ; vi++) {
            if (checklist[vi].checked) {
                localStorage.removeItem(`saved${vi}`)
                localStorage.setItem(`saved${vi-1}`, JSON.stringify(true))
            } 
        } 
        checklist.splice(`${checklist.indexOf(checkitem)}`, 1)
        PgFunc(list.length, done.length) 
        if (list.length == 0) {
            window.document.getElementById('listBox').classList.remove('listBorderBox')
            final.style.display = 'none';
            ExtBar.style.display = 'none';
            pgTxt.style.display = 'none'
        }
    })
    divParent.appendChild(container);
    checkedLabel.appendChild(checkitem);
    checkedLabel.appendChild(spanCheck )
    container.appendChild(checkedLabel);
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

    if (list.length > 0) {
        window.document.getElementById('listBox').className = 'listBorderBox'
    } 
    if (list.length == 0) {
        window.document.getElementById('listBox').classList.remove('listBorderBox')
        final.style.display = 'none';
        ExtBar.style.display = 'none';
        pgTxt.style.display = 'none'
    }
    
    if (checkitem.checked) {
        nwlbl.classList.add('done')
        undo.style.color = 'grey'
    } 
    else if (!checkitem.checked) {
        nwlbl.classList.add('undone')
        undo.style.color = 'var(--linhas)'
    }
    addFunc
    document.querySelector('input#descr').value = ''
}

window.document.querySelector('input#add').addEventListener('click', function () {MainFunc(window.document.querySelector('input#descr').value, false), PgFunc(list.length, done.length)})

window.document.getElementById('descr').addEventListener("keyup", ({key}) => {
    if (key === 'Enter') {
        MainFunc(window.document.querySelector('input#descr').value, false), PgFunc(list.length, done.length)
    }
})

const root = document.querySelector(':root')
window.document.getElementById('toggletheme').addEventListener('click', function DarkLight() {
    window.document.getElementById('theme').setAttribute('href', 'style.css')
    if (localStorage.getItem('savedtheme') == 'light' || localStorage.getItem('savedtheme') == null) {
        root.style.setProperty('--fundo', '#000000');
        root.style.setProperty('--lightdarkref', '#ffffff')
        root.style.setProperty('--caixaprincipalref', '#0a0a0a')
        root.style.setProperty('--caixaprincipal', '#0a0a0a')
        if (localStorage.getItem('linepref') == null || localStorage.getItem('linepref') == 'rgb(140, 14, 239)') {
            root.style.setProperty('--linhas', '#8c0eef')  
        } else if (localStorage.getItem('linepref') === 'rgb(0, 0, 0)') {
            root.style.setProperty('--linhas', 'rgb(255, 255, 255)')
            localStorage.setItem('linepref', 'rgb(255, 255, 255)')
        } else {
            root.style.setProperty('--linhas', localStorage.getItem('linepref'))  
        }
       
        localStorage.removeItem('savedtheme')
        localStorage.setItem('savedtheme', 'dark') 
        document.getElementById('icon').innerText = 'lightbulb'
    } else if (localStorage.getItem('savedtheme') == 'dark') {
        window.document.getElementById('theme').setAttribute('href', 'style.css')
        root.style.setProperty('--fundo', '#ffffff')
        root.style.setProperty('--lightdarkref', '#000000')
        root.style.setProperty('--caixaprincipalref', '#d0d0d0')
        if (localStorage.getItem('linepref') == null || localStorage.getItem('linepref') == 'rgb(140, 14, 239)') {
            root.style.setProperty('--caixaprincipal', '#c09cdc')
            root.style.setProperty('--linhas', '#8c0eef') 
        } else if (localStorage.getItem('linepref') === 'rgb(255, 255, 255)') {
            root.style.setProperty('--linhas', 'rgb(0, 0, 0)')
            localStorage.setItem('linepref', 'rgb(0, 0, 0)')
        } else {
            root.style.setProperty('--linhas', localStorage.getItem('linepref')) 
            root.style.setProperty('--caixaprincipal', localStorage.getItem('boxbgpref'))
        }
        if (localStorage.getItem('linepref') === 'rgb(250, 255, 0)') {
            if (localStorage.getItem('savedtheme') == 'light' || localStorage.getItem('savedtheme') == null) {
                window.document.getElementById('theme').setAttribute('href', 'lightyellow.css')
            } else {
                window.document.getElementById('theme').setAttribute('href', 'style.css')
            }
        }
        if (localStorage.getItem('linepref') === 'rgb(250, 255, 0)') {
            window.document.getElementById('theme').setAttribute('href', 'lightyellow.css')
        } else {
            window.document.getElementById('theme').setAttribute('href', 'style.css') 
        }
        localStorage.removeItem('savedtheme')
        localStorage.setItem('savedtheme', 'light')
        document.getElementById('icon').innerText = 'dark_mode'
    }
})

//adaptado do chat gpt

let cores = window.document.getElementsByClassName('optcol')
Array.from(cores).forEach(function(cor) {
    cor.addEventListener('click', function () {
        window.document.getElementById('theme').setAttribute('href', 'style.css')
        root.style.setProperty('--linhas', window.getComputedStyle(cor).backgroundColor)
        localStorage.removeItem('linepref')
        localStorage.setItem('linepref', window.getComputedStyle(cor).backgroundColor) 
        if (localStorage.getItem('savedtheme') == 'light' || localStorage.getItem('savedtheme') == null) {
            root.style.setProperty('--caixaprincipal', window.getComputedStyle(cor).color)   
        }
        localStorage.removeItem('boxbgpref')
        localStorage.setItem('boxbgpref', window.getComputedStyle(cor).color) 
    })
})

window.document.getElementById('c5').addEventListener('click', function () {
    if (localStorage.getItem('savedtheme') == 'light' || localStorage.getItem('savedtheme') == null) {
        window.document.getElementById('theme').setAttribute('href', 'lightyellow.css')
    } else {
        window.document.getElementById('theme').setAttribute('href', 'style.css')
    }
})

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
    subdiv.style.display = 'block'
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
    window.document.getElementById('listBox').classList.remove('listBorderBox')
})


const listasalva = JSON.parse(localStorage.getItem('savedlistjson'))
if (listasalva !== null) {
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




