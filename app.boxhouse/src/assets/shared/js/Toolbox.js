const settings       = require('../../../settings.js')
import { Database }  from '../../../app/core/Database.js'
import Color         from './Color.js'
import Solver        from './Solver.js'

export default class Toolbox{

    constructor(){
      this.data     = null
      this.database = new Database()
    }
    async init(){
        //...
    }

    async hexToFilter(hex){
        // -- Vars
        let res = null, rgb = null

        rgb = await this.hexToRgb(hex)
        res = await this.RGBToFilter(rgb)
        return res
    }

    async RGBToFilter(rgb){
        const color = new Color(rgb[0], rgb[1], rgb[2])
        const solver = new Solver(color)
        const result = solver.solve()
        return result.filter
    }

    async hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
      hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
      })

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
        : null
    }

    async doNotFuckWithMe(){
      if(window.location.href !== settings.url.frontend+'/'){
        if(!sessionStorage.getItem('session') )
          window.location.href = settings.url.frontend+'/'
        else{
          let session = JSON.parse(sessionStorage.getItem('session'))
          this.data   = await this.database.get({ collection:'user', mail:session.mail, pass:session.pass, })
          if( this.data === 'nok_user' || this.data.pk_id !== session.pk_id && this.data.mail !== session.mail && this.data.firstame !== session.firstame ){
            window.location.href = settings.url.frontend+'/'
          }
        }
      }
    }

}
