const express = require('express')
const SocketServer = require('ws').Server
const app=express()
let PORT = process.env.PORT || 3000
const server = app.listen(PORT,function () {
    let port = PORT
    let host = server.address().address
    console.log("Example app listening at http://%s:%s", host, port)

})

app.use('/',express.static('page'))

const wss = new SocketServer({server})

let number=0
let objs=[]
wss.on('connection', ws => {

    //連結時執行此 console 提示
    number+=1
    ws.send(number)
    objs.push({id:number,position:{x:0,y:0}})
    wss.clients.forEach(client=> {
        client.send(JSON.stringify(objs))
        
    })
    //console.log('Client connected')
    ws.on('message',buf=>{
        let data=JSON.parse(buf.toString())
        for(let i of objs){
            if(i.id==data.id){
                if(data.key==='a'){
                    i.position.x-=1
                }else if(data.key==='d'){
                    i.position.x+=1
                }else if(data.key==='w'){
                    i.position.y-=1
                }else if(data.key==='s'){
                    i.position.y+=1
                }
                
            }
        }
        
        
        wss.clients.forEach(client=> {
            client.send(JSON.stringify(objs))
            
        })
        
        
    })
    //當 WebSocket 的連線關閉時執行
    ws.id=number
    ws.on('close', () => {
        for(let i=0;i<objs.length;i++){
            if(objs[i].id===ws.id){
                objs.splice(i,1)
            }
        }
        //console.log('Close connected')
    })
})


