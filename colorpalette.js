// Common DOM Elements
const libraryul = document.querySelector('#saved-palettes')
const savePopup = document.querySelector('#save-popup')
const libraryPopup = document.querySelector('#library-popup')
const clipboardPopup = document.querySelector('#clipboard-popup')
const saveDarkLayer = document.querySelector('.save-dark-layer')
const libraryDarkLayer = document.querySelector('.library-dark-layer')


// Adding everything from localStorage to the library 
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
    let value = JSON.parse(localStorage.getItem(key))

    // Add button
    let newButton = document.createElement('button')
    newButton.innerHTML = key
    libraryul.innerHTML += `<li>${newButton.outerHTML}</li>`

    // Add colors
    let libraryListElement = document.querySelector(`#saved-palettes li:nth-child(${i + 1})`)
    for (let j = 0; j < 5; j++){
        color = value[j+1]
        newSpan = document.createElement('span')
        libraryListElement.appendChild(newSpan)
        newSpan.style.width = '35px'
        newSpan.style.height = '35px'
        newSpan.style.backgroundColor = color
    }

    // Add "delete palette" button
    libraryListElement.innerHTML += "<h2 class='delete-from-library'>X</h2>"
    liCounter++
}


//GSAP Animation Initialization
const t1 = new TimelineMax()


let generateColorsButton = document.querySelector('#button-tabs button:first-child')

function generateColors() {
    let colorsPlayed = 0
    generateColorsButton.disabled = true
    for (let i = 1; i < 5 + 1; i++) {
        if (lockedColors[i - 1]) {
            continue
        }
        colorsPlayed++
        let newColor = `rgb(${Math.floor(Math.random()*255) + 1}, ${Math.floor(Math.random()*255) + 1}, ${Math.floor(Math.random()*255) + 1})`
        const colorBox = document.querySelector(`#color-list li:nth-child(${i})`)
        t1.fromTo(colorBox, 0.5, {y:`-${colorBox.offsetHeight}`, backgroundColor:newColor}, {y:'0', ease: 'sine.out'})
        colorBox.innerHTML = newColor
    }
    setTimeout(() => generateColorsButton.disabled = false, 500*colorsPlayed)
}

function savePalette() {
    closeLibraryPopup()
    savePopup.style.display = 'block'
    saveDarkLayer.style.display = 'block'
}

function closeSavePopup() {
    savePopup.style.display = 'none'
    saveDarkLayer.style.display = 'none'
}

function library() {
    closeSavePopup()
    libraryPopup.style.display = 'block'
    libraryDarkLayer.style.display = 'block'
}

function closeLibraryPopup() {
    libraryPopup.style.display = 'none'
    libraryDarkLayer.style.display = 'none'
}

// saveDarkLayer.addEventListener('click', (e) => {
//     if (e.target != this) {
//         closeSavePopup()
//     }
// })

// libraryDarkLayer.addEventListener('click', (e) => {
//     if (e.target != this) {
//         closeLibraryPopup()
//     }
// })
 



var liCounter = 1

function transferToLibrary() {
    let colorStorage = {}

    // Adds button to library
    let inputText = document.querySelector('#name-of-palette').value
    if (inputText && !(Object.keys(localStorage).includes(inputText))) {
        document.querySelector('#name-of-palette').value = ''
        libraryul.innerHTML += `<li><button>${inputText}</button></li>`

    
        // Saves colors to library and localStorage
        let libraryulli = document.querySelector(`#saved-palettes li:nth-child(${localStorage.length + 1})`)
        let colors = document.querySelectorAll('#color-list li')
        spanCounter = 1     //DELETE LATER

        for (color of colors) {
            newSpan = document.createElement('span')
            libraryulli.appendChild(newSpan)
            newSpan.style.width = '35px'
            newSpan.style.height = '35px'
            newSpan.style.backgroundColor = color.innerHTML

            colorStorage[spanCounter++] = color.innerHTML

            console.log(colors)
            console.log(libraryulli)
            console.log(liCounter)
            console.log(localStorage.length)
        }

        localStorage.setItem(inputText, JSON.stringify(colorStorage))

        // Adds red X for deleting saved palettes
        libraryulli.innerHTML += "<h2 class='delete-from-library'>X</h2>"
        liCounter++
    } else {
        alert('Please enter a name (duplicate names are not allowed)')
    }
}




// 1 = LOCKED, 0 = UNLOCKED
const lockedColors = [0,0,0,0,0]

function changeIcon (childNum) {
    // childNum * 2 - 1 is used because the 3rd lock button, for example, is actually the 5th child
    let lock = document.querySelector(`#locks-and-clipboards button:nth-child(${childNum * 2 - 1}) img`)
    console.log()
    if (lock.src.includes('Images/lock.png')) {
        lock.src = './Images/unlock.png'
        lockedColors[childNum - 1] = 0
    } else {
        lock.src = './Images/lock.png'
        lockedColors[childNum - 1] = 1
    }
}

function copyToClipboard (colorNum) {
    let color = document.querySelector(`#color-list li:nth-child(${colorNum})`)
    let colorText = color.innerHTML.slice(4,-1)
    navigator.clipboard.writeText(colorText).then(clipboardSuccess, clipboardFail)
}

function clipboardSuccess () {
    clipboardPopup.innerHTML = 'Successfully copied color to clipboard ✓'
    clipboardPopup.style.opacity = '1'
    setTimeout(function () {clipboardPopup.style.opacity = '0'}, 2000)
} 

function clipboardFail () {
    clipboardPopup.innerHTML = 'Failed to copy color to clipboard ✗'
    clipboardPopup.style.opacity = '1'
    setTimeout(function () {clipboardPopup.style.opacity = '0'}, 2000)
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