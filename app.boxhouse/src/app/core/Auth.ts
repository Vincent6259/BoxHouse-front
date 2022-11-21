import { Injectable } from '@angular/core'
@Injectable()
export class Auth {

    public session = {
      core: {
        auth:{
          pk_id: null,
          firstname: "",
          lastname: "",
          mail: "",
        },
      },
    }

    public async createSession(pk_id,mail,firstname,lastname) {

      this.session.core.auth.pk_id     = pk_id
      this.session.core.auth.mail      = mail
      this.session.core.auth.lastname  = firstname
      this.session.core.auth.firstname = lastname
      let session = this.session
      sessionStorage.setItem('session' , JSON.stringify(session))
    }
}
