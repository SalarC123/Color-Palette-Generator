function generateColors() {
    for (let i = 1; i < 5 + 1; i++) {
        let newColor = `rgb(${Math.floor(Math.random()*255) + 1}, ${Math.floor(Math.random()*255) + 1}, ${Math.floor(Math.random()*255) + 1})`
        const colorBox = document.querySelector(`#color-list li:nth-child(${i})`)
        colorBox.style.backgroundColor = `${newColor}`
        colorBox.innerHTML = newColor
    }
}

function savePalette() {
    closeLibraryPopup()
    savePopup = document.querySelector('#save-popup')
    savePopup.style.display = 'block'
    blurBackground()
}

function closeSavePopup() {
    document.querySelector('#save-popup').style.display = 'none'
    unblurBackground()
}

function library() {
    closeSavePopup()
    libraryPopup = document.querySelector('#library-popup')
    libraryPopup.style.display = 'block'
    blurBackground()
}

function closeLibraryPopup() {
    document.querySelector('#library-popup').style.display = 'none'
    unblurBackground()
}

function transferToLibrary() {
    // Adds button to library
    libraryul = document.querySelector('#library-popup ul')
    inputText = document.querySelector('#name-of-palette').value
    if (inputText) {
        document.querySelector('#name-of-palette').value = ''
        libraryul.innerHTML += `<li><button>${inputText}</button></li>`
    }

    // Adds colors to library
    let colors = document.querySelectorAll('#color-list li')
    for (color of colors) {
        let newClassTag = `color-${randomClassName()}`
        newSpan = document.createElement('span')
        newSpan.setAttribute('class', newClassTag)
        libraryul.innerHTML += newSpan.outerHTML
        let colorBlock = document.querySelector('.' + newClassTag)
        console.log(libraryul)
        colorBlock.style.width = '35px'
        colorBlock.style.height = '35px'
        colorBlock.style.backgroundColor = color.innerHTML
    }
}

const blurredItems = ['#button-text', '#button-tabs', '#color-list', '#footer']

function blurBackground() {
    for (item of blurredItems) {
        document.querySelector(item).style.filter = 'blur(3px)'
    }
}

function unblurBackground() {
    for (item of blurredItems) {
        document.querySelector(item).style.filter = ''
    }
}

function randomClassName() {
    return Math.random().toString(36).substr(2,10)
}