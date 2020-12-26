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

let liCounter = 1
function transferToLibrary() {
    // Adds button to library
    libraryul = document.querySelector('#saved-palettes')
    inputText = document.querySelector('#name-of-palette').value
    if (inputText) {
        document.querySelector('#name-of-palette').value = ''
        libraryul.innerHTML += `<li><button onclick='colorsToMain(${liCounter})'>${inputText}</button></li>`
    }

    
    // Adds colors to library
    let libraryulli = document.querySelector(`#saved-palettes li:nth-child(${liCounter})`)
    let colors = document.querySelectorAll('#color-list li')
    for (color of colors) {
        let newClassTag = `color-${randomClassName()}`
        newSpan = document.createElement('span')
        newSpan.setAttribute('class', newClassTag)
        libraryulli.innerHTML += newSpan.outerHTML
        let colorBlock = document.querySelector('.' + newClassTag)
        colorBlock.style.width = '35px'
        colorBlock.style.height = '35px'
        colorBlock.style.backgroundColor = color.innerHTML
    }
    libraryulli.innerHTML += '<h2>X</h2>'
    liCounter++
}

const blurredItems = ['#button-text', '#button-tabs', '#color-list', '#footer']

function blurBackground() {
    for (item of blurredItems) {
        document.querySelector(item).style.filter = 'blur(3px)'
        document.querySelector(item).style.transition = 'all 0.2s ease-in 0s'
    }
}

function unblurBackground() {
    for (item of blurredItems) {
        document.querySelector(item).style.filter = 'blur(0px)'
        document.querySelector(item).style.transition = 'all 0.2s ease-out 0s'
    }
}

function randomClassName() {
    return Math.random().toString(36).substr(2,10)
}

function colorsToMain(childNum) {
    // const li = document.querySelector(`#saved-palettes li:nth-child(${childNum})`)
    const colors = document.querySelectorAll(`#saved-palettes li:nth-child(${childNum}) span`)
    const colorHolders = document.querySelectorAll('#color-list li')
    colors.forEach((span, index) => {
        let color = span.style.backgroundColor
        let colorHolderLi = Array.from(colorHolders)[index]
        colorHolderLi.innerHTML = color
        colorHolderLi.style.backgroundColor = color
    })
}

// EVENT LISTENERS
