 module.exports = {
     get url(){
       return this.req.url
     },
     get method(){
      return this.req.method.toLowerCase()
     },
     set method(val){
      return this.req.method=val
     },
    
 }