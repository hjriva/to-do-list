//precisa fazer com que, cda vez que algum item é removido ou adicionado, a barra de progresso é recalculada, pois atualmente ela permanece 
//done

let list = []
let checklist = []
let i = 0
let subdiv = window.document.getElementById('submit')
let final = window.document.querySelector('input#finaliza')
let divParent = window.document.getElementById('mostraLista') 
const bar = window.document.getElementById('pg')
//bar.style.display = 'none'
let done = []

function PgTest(a, b) {
    let wdcalc = window.document.getElementById('pgbar').offsetWidth
    let parentcalc = window.document.getElementById('pg').offsetWidth
    let pcwdcalc = 100 * (wdcalc / parentcalc)
    let allTasks = a.length
    let pgCount = 100 * (1 / allTasks )
    if (b.checked) {
    window.document.getElementById('pgbar').style.width = pcwdcalc + pgCount + '%'
    localStorage.removeItem(`BarPGwid`)
    localStorage.setItem(`BarPGwid`, pcwdcalc + pgCount + '%')
    } else if (!b.checked) {
        window.document.getElementById('pgbar').style.width = pcwdcalc - pgCount + '%'
        localStorage.removeItem(`BarPGwid`)
        localStorage.setItem(`BarPGwid`, pcwdcalc - pgCount + '%')
    }
    alert(localStorage.getItem(`BarPGwid`))
}

function PgCheck(a,b) {
    //let wdcalc = window.document.getElementById('pgbar').offsetWidth
    //let parentcalc = window.document.getElementById('pg').offsetWidth
    //let pcwdcalc = 100 * (wdcalc / parentcalc)
    let allTasks = a.length
    let pgCount = 100 * (b / allTasks )
    window.document.getElementById('pgbar').style.width = pgCount + '%'
    localStorage.removeItem(`BarPGwid`)
    localStorage.setItem(`BarPGwid`, pgCount + '%')
}


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
    nwlbl.innerText = lblcont;
    nwlbl.setAttribute('for', `item${i}`);
    nwlbl.setAttribute('id', `lbl${i}`);
    let container = document.createElement('div');
    let undo = document.createElement('div');
    undo.textContent = '          x';
    undo.className = 'delete';
    checkitem.addEventListener('click', function () {
        if (this.checked) {
            localStorage.removeItem(`saved${checklist.indexOf(checkitem)}`)
            localStorage.setItem(`saved${checklist.indexOf(checkitem)}`, JSON.stringify(true))
            alert(`${checklist.indexOf(checkitem)} checked`)
            nwlbl.classList.add('done')
            undo.style.color = 'grey'
            done.push(checkitem)
            PgTest(list, checkitem)
            }
        else if (!this.checked) {
            alert(`${checklist.indexOf(checkitem)} unchecked`)
            localStorage.removeItem(`saved${checklist.indexOf(checkitem)}`)
            localStorage.setItem(`saved${checklist.indexOf(checkitem)}`, JSON.stringify(false))
            nwlbl.classList.remove('done')
            nwlbl.classList.add('undone')
            undo.style.color = 'black'
            PgTest(list, checkitem)
            }      
    })
    undo.addEventListener('click', function() {
        list.splice(`${checklist.indexOf(checkitem)}`, 1)
        alert(`removing ${checklist.indexOf(checkitem)}`)
        alert(list.length)
        //localStorage.removeItem(`saved${checklist.indexOf(checkitem)}`)
        checkitem.remove()
        nwlbl.remove()
        undo.remove()
       let cond = list.length
        for (let vi=checklist.indexOf(checkitem); vi <= cond ; vi++) {
            if (checklist[vi].checked) {
                alert('teste')
                localStorage.removeItem(`saved${vi}`)
                localStorage.setItem(`saved${vi-1}`, JSON.stringify(true))
            }
        }
        PgCheck(list, done.length)
    })
    divParent.appendChild(container);
    container.appendChild(checkitem);
    container.appendChild(nwlbl);
    container.appendChild(undo);
    i++ 
    if (list.length > 1) {
        final.style.display = 'block';
    }
    if (checkitem.checked) {
        nwlbl.classList.add('done')
        undo.style.color = 'grey'
    } else if (!checkitem.checked) {
        nwlbl.classList.add('undone')
        undo.style.color = 'black'
    }
    document.querySelector('input#descr').value = ''
    
}

window.document.querySelector('input#add').addEventListener('click', function () {MainFunc(window.document.querySelector('input#descr').value, false)})

let newlist = document.createElement('input')
newlist.type = 'button'
newlist.value = 'editar lista'
let excluir = document.createElement('input')
excluir.type = 'button'
excluir.value = 'excluir lista'
excluir.setAttribute('id', 'removelist')


function UndoDisplay(disp) {
    let d = window.document.getElementsByClassName('delete')
    c = 0
    while (c <= d.length) {
        d[c].style.display = disp
        c++
    }}

function OngoingList() {
   //localStorage.setItem('savedList', divParent.innerHTML) 
    localStorage.setItem('savedlistjson', JSON.stringify(list))
    final.style.display = 'none'
    subdiv.style.display = 'none'
    divParent.appendChild(newlist)
    divParent.appendChild(excluir)
    newlist.style.display = 'block'
    bar.style.display = 'block'
    UndoDisplay('none')
}
final.addEventListener('click', function () {OngoingList()})
     
newlist.addEventListener('click', function() {
    this.style.display = 'none'
    final.style.display = 'inherit'
    subdiv.style.display = 'inherit'
    bar.style.display = 'none'
    UndoDisplay('initial') 
})

excluir.addEventListener('click', function () {
    localStorage.removeItem('savedlistjson')
    localStorage.setItem('savedlistjson', null)
    //sessionStorage.removeItem('savedlistjson')
    localStorage.clear()
    divParent.innerHTML = ''
    subdiv.style.display = 'initial'
    list.splice(list[0], list.length)
    checklist.splice(checklist[0], checklist.length)  
    window.document.getElementById('pgbar').style.width = '0'
})



//versão do localstorage.getitgem usando innerhtml
/*

const listasalva = localStorage.getItem('savedList')
if (listasalva != null) {
    divParent.innerHTML = listasalva
    OngoingList()
}


versão da mesma função acima usando json
para ser usada, a linha do setitem da função OngoingList precisa ser mudada para: localStorage.setItem('savedList', JSON.stringify(list))
 */


const listasalva = JSON.parse(localStorage.getItem('savedlistjson'))
if (listasalva !== null) {
    window.document.getElementById('pgbar').style.width =  window.document.getElementById('pgbar').style.width = localStorage.getItem('BarPGwid')
    let co = 0
    while (listasalva.length > co) {
        var result = JSON.parse(localStorage.getItem(`saved${co}`))
        MainFunc(listasalva[i], result)
        co++
    }
    OngoingList()
}
   
  
   
        
       
      

        
        
        