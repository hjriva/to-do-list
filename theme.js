window.addEventListener('load', function DarkLight() {
    const root = document.querySelector(':root')
    if (localStorage.getItem('savedtheme') == 'light' || localStorage.getItem('savedtheme') == null) {
        root.style.setProperty('--fundo', '#ffffff')
        root.style.setProperty('--drag-item-border', '#ffffff')
        if (localStorage.getItem('linepref') == null || localStorage.getItem('linepref') == 'rgb(192, 156, 220)') {
            root.style.setProperty('--caixaprincipal', '#c09cdc')
            root.style.setProperty('--linhas', '#8c0eef') 
        }   else {
            root.style.setProperty('--linhas', localStorage.getItem('linepref')) 
            root.style.setProperty('--caixaprincipal', localStorage.getItem('boxbgpref'))
        }
        localStorage.removeItem('savedtheme')
        localStorage.setItem('savedtheme', 'light')
        root.style.setProperty('--lightdarkref', '#000000')
        root.style.setProperty('--caixaprincipalref', '#d0d0d0')
        document.getElementById('icon').innerText = 'dark_mode'
        if (localStorage.getItem('linepref') === 'rgb(250, 255, 0)') {
            window.document.getElementById('theme').setAttribute('href', 'lightyellow.css')
        } else {
            window.document.getElementById('theme').setAttribute('href', 'style.css')  
        }
    } else if (localStorage.getItem('savedtheme') == 'dark') {
        root.style.setProperty('--fundo', '#000000');
        root.style.setProperty('--caixaprincipal', '#0a0a0a')
        if (localStorage.getItem('linepref') == null || localStorage.getItem('linepref') == 'rgb(192, 156, 220)') {
            root.style.setProperty('--linhas', '#8c0eef')  
            root.style.setProperty('--drag-item-border', '#8c0eef')
        } else {
            root.style.setProperty('--linhas', localStorage.getItem('linepref'))  
            root.style.setProperty('--drag-item-border', localStorage.getItem('linepref'))
        }
        localStorage.removeItem('savedtheme')
        localStorage.setItem('savedtheme', 'dark') 
        root.style.setProperty('--lightdarkref', '#ffffff')
        root.style.setProperty('--caixaprincipalref', '#161616')
        document.getElementById('icon').innerText = 'lightbulb'
    }
})
