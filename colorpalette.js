function generateColors(numOfColors) {
    for (let i = 1; i < numOfColors + 1; i++) {
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
}

function closeSavePopup() {
    document.querySelector('#save-popup').style.display = 'none'
    
}

function library() {
    closeSavePopup()
    libraryPopup = document.querySelector('#library-popup')
    libraryPopup.style.display = 'block'
    
}

function closeLibraryPopup() {
    document.querySelector('#library-popup').style.display = 'none'
}