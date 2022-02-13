
let ws = new WebSocket('wss://my-ws-test.herokuapp.com')
let h1=document.getElementById('h1')
let canvas=document.getElementById('canvas')
let ctx=canvas.getContext('2d')
let objs=[]
let id=0
function init(){
    ws.onopen = () => {
        console.log('open connection')
    }
    ws.onmessage=(e)=>{
        if(id===0){
            id=e.data
            return
        }
        console.log(e.data)
        objs=JSON.parse(e.data)
    }
    ws.onclose = () => {
        console.log('close connection')
    }

    window.addEventListener('keydown',keydown)
    
}


function draw(){
    ctx.fillStyle='black'
    ctx.fillRect(0,0,500,300)
    for(let i of objs){
        ctx.fillStyle='blue'
        ctx.fillRect(i.position.x,i.position.y,10,10)

    }
    requestAnimationFrame(draw)
}


function keydown(e){
    let keyid=e.code
    if(keyid==="KeyA"){
        ws.send(JSON.stringify({id:id,key:'a'}))
    }
    if(keyid==="KeyW"){
        ws.send(JSON.stringify({id:id,key:'w'}))
    }
    if(keyid==="KeyS"){
        ws.send(JSON.stringify({id:id,key:'s'}))
    }
    if(keyid==="KeyD"){
        ws.send(JSON.stringify({id:id,key:'d'}))
    }

}

init()
draw()
