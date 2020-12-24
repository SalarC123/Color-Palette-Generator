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
    libraryul = document.querySelector('#library-popup ul')
    inputText = document.querySelector('#name-of-palette').value
    if (inputText) {
        document.querySelector('#name-of-palette').value = ''
        libraryul.innerHTML += `<li>${inputText}</li>`
    }

    let colors = document.querySelector(`#color-list li`)
}

function blurBackground() {
    document.querySelector('#button-text').style.filter = 'blur(3px)'
    document.querySelector('#button-tabs').style.filter = 'blur(3px)'
    document.querySelector('#color-list').style.filter = 'blur(3px)'
}

function unblurBackground() {
    document.querySelector('#button-text').style.filter = ''
    document.querySelector('#button-tabs').style.filter = ''
    document.querySelector('#color-list').style.filter = ''
}