
function StoreCheck(selectedArr)
for (let f = 0; selectedArr.length >= f; f++) {
        
    //localStorage.setItem(`saved${f}`, JSON.stringify(false))
    window.document.getElementById(`item${i}`).addEventListener('click', function () {
        if (window.document.getElementById(`item${i}`).checked) {
        localStorage.removeItem(`saved${f}`)
        localStorage.setItem(`saved${f}`, JSON.stringify(true))
        alert(`saved${f}`)} else if (!window.document.getElementById(`item${i}`).checked) {
            alert('ayyy')
            localStorage.removeItem(`saved${f}`)
            localStorage.setItem(`saved${f}`, JSON.stringify(false))
        }
    
        
    })}