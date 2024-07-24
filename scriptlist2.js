window.document.getElementById('currentcolor').addEventListener('click', function () {
    let optionalColors = window.document.getElementById('optcolors')
    optionalColors.style.display = optionalColors.style.display == 'none' ? 'grid' : 'none'
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
    } else {
        pgTxt.innerHTML = pgCalc.toLocaleString('pt-br', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + '%' + ' (' + done.length + ' de ' + list.length + ')'
    }
    localStorage.setItem(`BarPGwid`, pgCalc + '%')
}

// Ref: https://www.w3resource.com/javascript-exercises/event/javascript-event-handling-exercise-6.php
const dragList = document.getElementById('mostraLista');
let draggedItem = null;

dragList.addEventListener('dragstart', handleDragStart);
dragList.addEventListener('dragover', handleDragOver);
dragList.addEventListener('drop', handleDrop);
dragList.addEventListener('dragend', handleDragEnd);

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
        for (let c = 0; c < clss.length; c++) {
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
        } else {
            targetItem.parentNode.insertBefore(draggedItem, targetItem);
        }
    } else if (targetItem.getAttribute('id') == 'mostraLista') {
        let clss = window.document.getElementsByClassName('drag-item')
        for (let c = 0, calc = 0; calc <= event.clientY; c++) {
            calc = clss[c].getBoundingClientRect().top
            if (calc >= event.clientY) {
                dragList.insertBefore(draggedItem, dragList.children[c])
                break;
            }
        }
    }

    if (window.document.getElementById(`item${draggedItem.getAttribute('id')}`).checked) {
        updateArray('.done', done)
    }
}

function handleDragEnd(event) {
    draggedItem.style.opacity = '1';
    draggedItem = null;

    let clss = window.document.getElementsByClassName('drag-item')
    for (let c = 0; c < clss.length; c++) {
        clss[c].style.margin = '0px 3.5px 0px 3.5px'
    }

    updateArrayList()
    updateArrayCheckList()
}

// Funções para atualizar arrays
function updateArray(selector, array) {
    array.length = 0;
    document.querySelectorAll(selector).forEach(item => array.push(item));
}

function updateArrayCheckList() {
    let listItems = document.querySelectorAll('.allitems');
    list = [];
    listItems.forEach(item => list.push(item.innerText));
    localStorage.setItem('savedlistjson', JSON.stringify(list));
}

function updateArrayList() {
    let listItems = document.querySelectorAll('.itemlist');
    checklist = [];
    listItems.forEach((item, index) => {
        checklist.push(item);
        localStorage.setItem(`saved${index}`, item.checked);
    });
}

dragList.addEventListener('touchstart', handleTouchStart);
dragList.addEventListener('touchmove', handleTouchMove);
dragList.addEventListener('touchend', handleTouchEnd);

let initialX = null;
let initialY = null;

function handleTouchStart(event) {
    if (event.target.matches('input[type="checkbox"]')) return;
    draggedItem = event.target.closest('.drag-item');
    initialX = event.touches[0].clientX;
    initialY = event.touches[0].clientY;
    draggedItem.style.opacity = '0.5';
}

function handleTouchMove(event) {
    event.preventDefault();
    if (event.target.matches('input[type="checkbox"]')) return;
    const touch = event.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    const dx = currentX - initialX;
    const dy = currentY - initialY;
    draggedItem.style.transform = `translate(${dx}px, ${dy}px)`;
}

function handleTouchEnd(event) {
    draggedItem.style.opacity = '1';
    draggedItem.style.transform = '';
    const targetItem = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    if (targetItem && targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
        targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
    }
    draggedItem = null;
    initialX = null;
    initialY = null;
}

document.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('touchstart', handleTouchStart);
    item.addEventListener('touchmove', handleTouchMove);
    item.addEventListener('touchend', handleTouchEnd);
});

function MainFunc(itemvalue, booleanValue) {
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

    checkitem.addEventListener('click', function (event) {
        event.stopPropagation();
        if (this.checked) {
            done.push(checkitem);
            nwlbl.classList.add('done');
            undo.style.color = 'grey';
            PgFunc(list.length, done.length);
            undo.style.display = 'none';
        } else {
            done.splice(done.indexOf(checkitem), 1);
            nwlbl.classList.remove('done');
            nwlbl.classList.add('undone');
            undo.style.color = 'var(--linhas)';
            PgFunc(list.length, done.length);
            undo.style.display = 'inline';
        }
        updateArrayList();
        updateArrayCheckList();
    });

    undo.addEventListener('click', function(event) {
        event.stopPropagation();
        list.splice(checklist.indexOf(checkitem), 1);
        if (checkitem.checked) {
            done.splice(done.indexOf(checkitem), 1);
        }
        checkitem.remove();
        nwlbl.remove();
        undo.remove();
        container.remove();
        PgFunc(list.length, done.length);
        if (list.length === 0) {
            window.document.getElementById('listBox').classList.remove('listBorderBox');
            UnderList.style.display = 'none';
        }
        updateArrayList();
        updateArrayCheckList();
    });

    container.appendChild(checkitem);
    container.appendChild(spanCheck);
    container.appendChild(checkedLabel);
    container.appendChild(nwlbl);
    container.appendChild(undo);
    divParent.appendChild(container);

    container.addEventListener('dragstart', handleDragStart);
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);
    container.addEventListener('dragend', handleDragEnd);

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    i++;
    if (divParent.contains(container)) {
        window.document.getElementById('listBox').classList.add('listBorderBox');
    }
    UnderList.style.display = 'inline';
}

final.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (final.value.length > 0) {
            MainFunc(final.value, false);
            final.value = '';
            updateArrayList();
            updateArrayCheckList();
        } else {
            alert('Digite algo')
        }
    }
})

subdiv.addEventListener('click', function (event) {
    if (final.value.length > 0) {
        MainFunc(final.value, false);
        final.value = '';
        updateArrayList();
        updateArrayCheckList();
    } else {
        alert('Digite algo')
    }
});

function start() {
    const storedList = JSON.parse(localStorage.getItem('savedlistjson') || '[]');
    storedList.forEach((item, index) => {
        const checked = localStorage.getItem(`saved${index}`) === 'true';
        MainFunc(item, checked);
    });
}

start();
PgFunc(list.length, done.length);
