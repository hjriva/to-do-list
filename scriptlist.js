let list = []
let i = 0
let subdiv = window.document.getElementById('submit')
let final = window.document.querySelector('input#finaliza')
let divParent = window.document.getElementById('mostraLista') 
        
function MainFunc(itemvalue) {
    let checkitem = document.createElement('input');
    checkitem.type = 'checkbox';
    checkitem.className = 'itemlist';
    checkitem.setAttribute('id', `item${i}`);
    let lblcont = itemvalue
    list.push(lblcont);
    let nwlbl = document.createElement('label');
    nwlbl.innerText = lblcont;
    nwlbl.setAttribute('for', `item${i}`);
    let container = document.createElement('div');
    let undo = document.createElement('div');
    undo.textContent = '          x';
    undo.className = 'delete';
    divParent.appendChild(container);
    container.appendChild(checkitem);
    container.appendChild(nwlbl);
    container.appendChild(undo);
    i++ 
    if (list.length > 1) {
        final.style.display = 'block';
    }
    document.querySelector('input#descr').value = ''
}

window.document.querySelector('input#add').addEventListener('click', function () {MainFunc(window.document.querySelector('input#descr').value)})
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
    localStorage.setItem('savedList', divParent.innerHTML) 
    final.style.display = 'none'
    subdiv.style.display = 'none'
    divParent.appendChild(newlist)
    divParent.appendChild(excluir)
    newlist.style.display = 'block'
    UndoDisplay('none')
}

final.addEventListener('click', function () {OngoingList()})
        
newlist.addEventListener('click', function() {
    this.style.display = 'none'
    final.style.display = 'inherit'
    subdiv.style.display = 'inherit'
    UndoDisplay('initial')
})

excluir.addEventListener('click', function () {
    localStorage.removeItem('savedList')
    divParent.innerHTML = ''
    subdiv.style.display = 'initial'
    
})

//versão do localstorage.getitgem usando innerhtml

const listasalva = localStorage.getItem('savedList')
if (listasalva != null) {
    divParent.innerHTML = listasalva
    OngoingList()
}

/*
versão da mesma função acima usando json
para ser usada, a linha do setitem da função OngoingList precisa ser mudada para: localStorage.setItem('savedList', JSON.stringify(list))
const listasalva = JSON.parse(localStorage.getItem('savedList'))
if (listasalva !== null) {
    let co = 0
    while (listasalva.length > co) {
        MainFunc(listasalva[i])
        co++
    }
    OngoingList()
}
    */
  
   
        
       
      

        
        
        