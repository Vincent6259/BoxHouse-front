import Network from './Network.js'
import { settings }   from '../settings.js'
const network  = new Network()

export default class Database {

    // =================================================
    // CONSTRUCT & INIT
    // =================================================

    constructor(){}

    async init(){
        let self = this
    }
    // ==================================================================================================
    // GETALL | GET | UPDATE | CREATE | DELETE
    // ==================================================================================================

    async getAll(args){

        // Vars & Facultative parameters
        let response = null
        args             = args             || {}
        args.collection  = args.collection  || 'null'
        args.params      = args.params      || []
        
        // Params
        let endofurl = ''
        if( Object.entries(args.params).length>0 ){
            let index = 0
            for( const [key, value] of Object.entries(args.params) ){
                if(index==0)  endofurl+=`?${encodeURI(key)}=${encodeURI(value)}`
                else          endofurl+=`&${encodeURI(key)}=${encodeURI(value)}`
                index++
            }
        }
        
        response = JSON.parse( await network.promiseGet( settings.url.backend+'/'+args.collection+endofurl ) )
        return response
        
        // Get collection
        let collection = [...this[args.collection]]
        
        // Return
        return collection // Copy of local database data

    }

    async get(args){
        // Vars & Facultative parameters
        let response = null
        let single = null
        args             = args             || {}
        args.collection  = args.collection  || 'null'
        args.mail        = args.mail        || null
        args.pass        = args.pass        || null
        args.params      = args.params      || []
        args.pk_id       = args.pk_id       || null

        // [ONLINE]
        if( window.navigator.onLine == true ){
            // Params
            let endofurl = ''
            if( Object.entries(args.params).length>0 ){
                let index = 0
                for( const [key, value] of Object.entries(args.params) ){
                    if(index==0)  endofurl+=`?${encodeURI(key)}=${encodeURI(value)}`
                    else          endofurl+=`&${encodeURI(key)}=${encodeURI(value)}`
                }
            }
            if(args.pk_id)
              response = JSON.parse( await network.promiseGet( settings.url.backend+'/'+args.collection+'/'+args.mail+'/'+args.pk_id+endofurl ) )
            else
              response = JSON.parse( await network.promiseGet( settings.url.backend+'/'+args.collection+'/'+args.mail+'/'+args.pass+endofurl ) )

            if(response.error)
              single = response.error
            else
              single = response
        }

        // [OFFLINE]
        else{
            alert('Vous ĂŞtes actuellement hors-ligne. Les donnĂ©es ne seront peut ĂŞtre pas accessibles.')
            // Get collection
            let collection = [...this[args.collection]]
            // Get single
            for( let i=0; i<collection.length; i++ ){
                if( collection[i].pk_id == args.pk_id ) single = {...collection[i]}
            }
        }

        // Return
        return single // Copy of local database data

    }

    async update(args){

        // Vars & Facultative parameters
        let response = null
        args             = args             || {}
        args.collection  = args.collection  || 'null'
        args.pk_id       = args.pk_id       || null
        args.params      = args.params      || []
        args.data        = args.data        || {}

        let endofurl = ''
        if( Object.entries(args.params).length>0 ){
            let index = 0
            for( const [key, value] of Object.entries(args.params) ){
                if(index==0)  endofurl+=`?${encodeURI(key)}=${encodeURI(value)}`
                else          endofurl+=`&${encodeURI(key)}=${encodeURI(value)}`
                index++
            }
        }

        response = await network.promisePut( settings.url.backend+'/'+args.collection+'/'+args.pk_id+endofurl, args.data  )

        // Return
        return response

    }

    async create(args){

        // Vars & Facultative parameters
        let response               = null
        args                       = args                       || {}
        args.collection            = args.collection            || 'null'
        args.params                = args.params                || []
        args.data                  = args.data                  || {}
        args.progressHandler       = args.progressHandler       || function(e){}
        args.completeHandler       = args.completeHandler       || function(e){}
        args.progressUploadHandler = args.progressUploadHandler || function(e){}

        // [ONLINE] Send data to API
        if( window.navigator.onLine == true )
            response = await network.promisePost( settings.url.backend+'/'+args.collection, args.data, args.progressHandler, args.completeHandler, args.progressUploadHandler )

        // [OFFLINE] Add data to sync queue
        else if( window.navigator.onLine == false )
            this.tmp.push( function(){ network.promisePost( settings.url.backend+'/'+args.collection, args.data, args.progressHandler, args.completeHandler, args.progressUploadHandler ) } )

        // Return
        return response

    }

    async delete(args){

        // Vars & Facultative parameters
        let response = null
        args             = args             || {}
        args.collection  = args.collection  || 'null'
        args.pk_id       = args.pk_id       || null
        args.params      = args.params      || []
        args.data        = args.data        || {}
        // Verifications
        if( args.pk_id == null ) alert("Erreur : Vous essayez de supprimer un Ă©lĂ©ment qui n'a pas (encore?) d'identifiant")

        let endofurl = ''
        if( Object.entries(args.params).length>0 ){
            let index = 0
            for( const [key, value] of Object.entries(args.params) ){
                if(index==0)  endofurl+=`?${encodeURI(key)}=${encodeURI(value)}`
                else          endofurl+=`&${encodeURI(key)}=${encodeURI(value)}`
                index++
            }
        }

        response = await network.promiseDelete( settings.url.backend+'/'+args.collection+'/'+args.pk_id+endofurl )

        // Return
        return response

    }



}
