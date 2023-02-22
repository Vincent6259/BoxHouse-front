import { bhouse }    from '../../bhouse.js'

export default class Auth {

    session = {
        pk_id: null,
        firstname: "",
        lastname: "",
        mail: "",
    }

    async createSession(pk_id,mail,firstname,lastname) {

      this.session.pk_id     = pk_id
      this.session.mail      = mail
      this.session.lastname  = firstname
      this.session.firstname = lastname
      let session = this.session
      sessionStorage.setItem('session' , JSON.stringify(session))
    }
    async firstConnection(){
        if(this.session.pk_id !== null && this.session.pk_id !== "" && !sessionStorage.getItem('session') )
            return true
        else if(this.session.pk_id !== null && this.session.pk_id !== "" && sessionStorage.getItem('session') ){
            return false
        }else 
            return true
    }
    async disconnect(){
      sessionStorage.removeItem('session')
    }
}
