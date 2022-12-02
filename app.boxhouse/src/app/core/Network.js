export class Network{



    // =================================================
    // CONSTRUCT & INIT
    // =================================================

    constructor(){
        this.type     = "NetworkController"
        this.localdb  = {} // Store data locally
    }

    async init(){
        // ...
    }



    // =================================================
    // GET -> Read
    // =================================================

    async promiseGet(url){
        return await this.request({ url:url, method:'GET', body:{} })
    }



    // =================================================
    // POST -> Create
    // =================================================

    async promisePost( url, body){
        return await this.request({
            url:url, method:'POST', body:body })
    }



    // =================================================
    // PUT -> Update/Replace
    // =================================================

    async promisePut(url,body){
        return await this.request({ url:url, method:'PUT', body:body })
    }



    // =================================================
    // PUT -> Update/Modify
    // =================================================

    async promisePatch(url,body){
        return await this.request({ url:url, method:'PATCH', body:body })
    }



    // =================================================
    // DELETE -> Delete
    // =================================================

    async promiseDelete(url){
        console.log(url)
        return await this.request({ url:url, method:'DELETE', body:{} })
    }



    // =================================================
    // REQUEST -> Generic
    // =================================================

    async request(args){

        // Parameters
        args.url     = args.url     || ''
        args.method  = args.method  || 'GET'
        args.body    = args.body    || {}

        // Vars
        let self = this
        let url = args.url
        let method = args.method
        let body = args.body

        // Online :
        return new Promise(resolve => {
            // AJAX request
            let xhr = new XMLHttpRequest()
            // HTTP Method
            xhr.open(method,url,true) // false = synchronous
            // Asynchrone
            xhr.onreadystatechange = function(){
                // Succes
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
                    let data  = xhr.responseText
                    resolve( data ) // = Return
                }
                // Error
                else if(this.readyState === XMLHttpRequest.DONE && this.status != 200) {
                    console.log('• NetworkController.js xhr error -> '+xhr.status+' -> '+xhr.statusText+' -> '+url)
                    resolve( null )
                }
            }
            // Send request with post vars
            xhr.send( JSON.stringify(body) )
            //console.log(JSON.stringify(body))
        })

    }



}
