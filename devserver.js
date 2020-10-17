const fetch = require('node-fetch')

let process

function spawnserver(){
    process = require('child_process').spawn("node", ["server/server.js", "dev"])

    process.stdout.on('data', (data) => {    
        console.error(`stdout: ${data}`)
    })

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    })
}

function rebuildsrc(){
    process = require('child_process').spawn("npm", ["run", "build"])

    process.stdout.on('data', (data) => {    
        console.error(`stdout: ${data}`)
    })

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    })

    process.on("close", code => {
        console.log("build exited with code", code)
        fetch("http://localhost:3000/reloadsrc").then(response=>response.text().then(content=>console.log(content)))
    })
}

spawnserver()

const watcher = require("chokidar").watch("./server")

watcher.on("ready", _=>{    
    watcher.on("all", _=>{      
        console.log("server reload")
        process.kill()
        spawnserver()
    })
})

const srcWatcher = require("chokidar").watch("./src")

srcWatcher.on("ready", _=>{    
    srcWatcher.on("all", _=>{      
        console.log("rebuild src")        
        rebuildsrc()
    })
})
