// Common DOM Elements
const libraryul = document.querySelector('#saved-palettes')
const savePopup = document.querySelector('#save-popup')
const libraryPopup = document.querySelector('#library-popup')

// library list element counter
let liCounter = 1


// Adding everything from localStorage to the library 
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
    let value = localStorage.getItem(key)

    // Add button
    let newButton = document.createElement('button')
    newButton.innerHTML = key
    libraryul.innerHTML += `<li>${newButton.outerHTML}</li>`

    // Add colors
    let libraryListElement = document.querySelector(`#saved-palettes li:nth-child(${i + 1})`)
    for (let j = 0; j < 5; j++){
        let newClassTag = `color-${randomClassName()}`
        color = value.split(',').slice(j*3, j*3+3).join(',')
        newSpan = document.createElement('span')
        newSpan.setAttribute('class', newClassTag)
        libraryListElement.appendChild(newSpan)
        let colorBlock = document.querySelector('.' + newClassTag)
        colorBlock.style.width = '35px'
        colorBlock.style.height = '35px'
        colorBlock.style.backgroundColor = color
    }

    // Add "delete palette" button
    libraryListElement.innerHTML += "<h2 class='delete-from-library'>X</h2>"
    liCounter++
}


//GSAP Animation Initialization
const t1 = new TimelineMax()



function generateColors() {
    for (let i = 1; i < 5 + 1; i++) {
        if (lockedColors[i - 1]) {
            continue
        }
        let newColor = `rgb(${Math.floor(Math.random()*255) + 1}, ${Math.floor(Math.random()*255) + 1}, ${Math.floor(Math.random()*255) + 1})`
        const colorBox = document.querySelector(`#color-list li:nth-child(${i})`)
        t1.fromTo(colorBox, 0.5, {y:'-800', backgroundColor:newColor}, {y:'0', ease: 'sine.out'})
        // colorBox.style.backgroundColor = `${newColor}`
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



function transferToLibrary() {
    let colorStorage = []

    // Adds button to library
    let inputText = document.querySelector('#name-of-palette').value
    if (inputText) {
        document.querySelector('#name-of-palette').value = ''
        libraryul.innerHTML += `<li><button>${inputText}</button></li>`
    }

    
    // Saves colors to library and localStorage
    let libraryulli = document.querySelector(`#saved-palettes li:nth-child(${liCounter})`)
    let colors = document.querySelectorAll('#color-list li')
    for (color of colors) {
        let newClassTag = `color-${randomClassName()}`
        newSpan = document.createElement('span')
        newSpan.setAttribute('class', newClassTag)
        libraryulli.appendChild(newSpan)
        let colorBlock = document.querySelector('.' + newClassTag)
        colorBlock.style.width = '35px'
        colorBlock.style.height = '35px'
        colorBlock.style.backgroundColor = color.innerHTML

        colorStorage.push(color.innerHTML)
        localStorage.setItem(inputText, colorStorage)
    }

    // Adds red X for deleting saved palettes
    libraryulli.innerHTML += "<h2 class='delete-from-library'>X</h2>"
    liCounter++
}



const blurredItems = ['#button-text', '#button-tabs', '#color-list', '#footer', '#locks']

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


// 1 = LOCKED, 0 = UNLOCKED
const lockedColors = [0,0,0,0,0]

function changeIcon (childNum) {
    let lock = document.querySelector(`#locks button:nth-child(${childNum}) img`)
    console.log()
    if (lock.src.includes('Images/lock.png')) {
        lock.src = './Images/unlock.png'
        lockedColors[childNum - 1] = 0
    } else {
        lock.src = './Images/lock.png'
        lockedColors[childNum - 1] = 1
    }
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

        buttonText = e.target.parentElement.firstChild.innerHTML
        localStorage.removeItem(buttonText)
    }
})
