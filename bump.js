const fs = require('fs')

let packagejson = JSON.parse(fs.readFileSync("package.json"))

let verparts = packagejson.version.split(".")

let newversion = verparts[0] + "." + verparts[1] + "." + (parseInt(verparts[2]) + 1).toString()

packagejson.version = newversion

fs.writeFileSync("package.json", JSON.stringify(packagejson, null, 2))

console.log("bumped", newversion)
