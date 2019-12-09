const kaikeba = {
    info:{
        name:'xlx',
        desc:'小猪'
    },
    get name(){
        return this.info.name
    },
    set name(newName){
        this.info.name=newName
    }

}

console.log(kaikeba.name)
kaikeba.name= '一直等你等你'
console.log(kaikeba.name)