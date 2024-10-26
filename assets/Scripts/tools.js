import { popUp } from './popup.js'

const popUpElement = document.getElementById("popup")
const popup = new popUp(popUpElement, "Copied to clipboard")

//Copy text to clipboard
function copyToClipboard(textToCopy) {
    console.log("this has been done")
    popup.Activate()
    navigator.clipboard.writeText(textToCopy)
}

window.copyToClipboard = copyToClipboard