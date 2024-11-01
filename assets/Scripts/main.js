import * as tools from './tools.js'

const popUpElement = document.getElementById("popup")
const tooltipElement = document.getElementById("tooltip")
new tools.popUp(popUpElement, {textContent: "Copy to clipboard"})

const skill_cards = document.getElementsByClassName("skill-card")