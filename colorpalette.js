//GSAP Animation
const t1 = new TimelineMax()

t1.fromTo('#button-tabs', 1, {x: '-300'}, {x:'0', ease: 'sine.out'})
.fromTo('#button-text', 1, {x: '300'}, {x:'0', ease: 'sine.out'}, '-=1')
.fromTo('#color-list', 1, {y:'-600'}, {y:'0', ease: 'sine.out'}, '-=1')
.fromTo('#button-tabs', 1, {padding:'100px'}, {padding:'5px', ease:'sine.out'}, '-=1')



// Common DOM Elements
const libraryul = document.querySelector('#saved-palettes')
const savePopup = document.querySelector('#save-popup')
const libraryPopup = document.querySelector('#library-popup')



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
    savePopup.style.display = 'block'
    blurBackground()
}

function closeSavePopup() {
    savePopup.style.display = 'none'
    unblurBackground()
}

function library() {
    closeSavePopup()
    libraryPopup.style.display = 'block'
    blurBackground()
}

function closeLibraryPopup() {
    libraryPopup.style.display = 'none'
    unblurBackground()
}



let liCounter = 1
function transferToLibrary() {
    // Adds button to library
    let inputText = document.querySelector('#name-of-palette').value
    if (inputText) {
        document.querySelector('#name-of-palette').value = ''
        libraryul.innerHTML += `<li><button>${inputText}</button></li>`
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

    // Adds red X for deleting saved palettes
    libraryulli.innerHTML += "<h2 class='delete-from-library'>X</h2>"
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



// Listens for button clicks to transfer saved palette to main screen
libraryul.addEventListener('click', function (e) {
    if (e.target instanceof HTMLButtonElement) {
        let elem = e.target.parentElement
        let childNum = Array.from(elem.parentElement.children).indexOf(elem) + 1
        const colors = document.querySelectorAll(`#saved-palettes li:nth-child(${childNum}) span`)
        const colorHolders = document.querySelectorAll('#color-list li')
        colors.forEach((span, index) => {
            let color = span.style.backgroundColor
            let colorHolderLi = Array.from(colorHolders)[index]
            colorHolderLi.innerHTML = color
            colorHolderLi.style.backgroundColor = color
        })
    }
})

// Listens for clicks on delete palette button in library
libraryul.addEventListener('click', e => {
    if (e.target instanceof HTMLHeadingElement) {
        libraryul.removeChild(e.target.parentElement)
        liCounter--
    }
})