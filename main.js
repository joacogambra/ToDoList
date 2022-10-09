let date = document.querySelector('#date')
let list = document.querySelector('#list')
let input = document.querySelector('#input')
let buttonEnter = document.querySelector('#enter')
let check = 'fa-check-circle'
let uncheck = 'fa-circle'
let lineThrough = 'line-through'
let id = 0
let LIST=[]


let DATE = new Date()
date.innerHTML= DATE.toLocaleDateString('en-EU', {weekday:'long',month:'short',day:"numeric"})

function addTask(tarea,id,realizado,delet){
    if(delet){return}   

    let REALIZADO = realizado ?check :uncheck
    let line = realizado ?lineThrough :''

    let elemento = `<li id='elemento'>
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                   <p class="text ${line}">${tarea}</p>
                    <i class="fas fa-trash de" data="delet" id="${id}"></i>
                    </li>`
    list.insertAdjacentHTML('beforeend',elemento)    
}

function taskFinish(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true

}

function taskDelete(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].delet = true
}

buttonEnter.addEventListener('click', ()=>{
    let tarea = input.value
    if(tarea){
        addTask(tarea,id,false,false)
        LIST.push({
            name: tarea,
            id: id,
            realizado: false,
            delet: false
        })
    }
    localStorage.setItem('ToDo', JSON.stringify(LIST))
    input.value=''
    id++
})

document.addEventListener("keyup", function(event){
    if(event.key=="Enter"){
        let tarea = input.value
        if(tarea){
            addTask(tarea,id,false,false)
            LIST.push({
                name: tarea,
                id: id,
                realizado: false,
                delet: false
            })
        }
        localStorage.setItem('ToDo', JSON.stringify(LIST))
        input.value=""
        id++
    }
})

list.addEventListener('click', function(event){
    let element = event.target
    let elementData = element.attributes.data.value
    if(elementData==='realizado'){
        taskFinish(element)
    }
    else if(elementData==='delet'){
        taskDelete(element)
    }
    localStorage.setItem('ToDo', JSON.stringify(LIST))
})

let data = localStorage.getItem('ToDo')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    loadList(LIST)
}else{
    LIST = []
    id = 0
}

function loadList(DATA){
    DATA.forEach(function(i){
        addTask(i.name, i.id, i.realizado, i.delet)
    })
}

let checklan = document.querySelector('.checklan')
checklan.addEventListener('click', idioma)

function idioma(){
    let idl=checklan.checked
    if(idl==true){
        location.href='./es/es.html'
    }else{
        location.href='../index.html'
    }
}