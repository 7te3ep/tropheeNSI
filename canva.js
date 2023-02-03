const canva = document.querySelector('canvas')
const ctx = canva.getContext('2d')
canva.width = window.innerWidth
canva.height = window.innerHeight

export {canva,ctx}