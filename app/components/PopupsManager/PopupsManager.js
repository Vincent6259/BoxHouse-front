/* -- CORE -- */
import Auth         from '../../core/Auth.js'
import Database     from '../../core/Database.js'
import Network      from '../../core/Network.js'
import Toolbox      from '../../shared/js/Toolbox.js'

/* -- POPUPS -- */
import PopupScan    from '../PopupScan/PopupScan.js'

/* -- CONST -- */
import { settings } from '../../settings.js'
import { bhouse }   from '../../bhouse.js'

export default class PopupsManager {
    
    constructor() {  
        
        let self          = this
        this.elements = [
                { class: PopupScan, name: 'PopupScan', style:'template.css' },
            ]
        this.popups = {}
        
        this.load()
        
    }
    async load(){
        for( let popup of this.elements){
            if( !this.popups[popup.name] ) this.popups[popup.name] = new popup.class(bhouse) 
        }
        
        await this.generateComponentTag()
        await this.bindEvents()
    }
    
    async show(args){ 
        let page       = args.page      || 'PageHome'
        let direction  = args.direction || 'right'
        let animate    = args.animate   || true
        
        let view = null, tag  = null, self = this
        if( this.current_page === null ){
            this.current_page = this.popups[page] // FIRST LOAD OF THE APP LOGICALLY
            let html = await this.popups[page].getHtml()
            await this.popups[page].toolbox.doNotFuckWithMe()
            await this.popups[page].load()
            document.getElementById(this.current_page.name).innerHTML           = html
            document.getElementById(this.current_page.name).style.display       ='block'
            document.getElementById(this.current_page.name).style.pointerEvents ='all'
            if(this.current_page.name !== 'PageLogin')
                await bhouse.Menu.showMenu()
            else if(this.current_page.name === 'PageLogin')
                await bhouse.Menu.hideMenu()
            
            await this.popups[page].bindEvents()
        }
        else if ( this.current_page !== null ) {
            await this.hide(this.current_page.name,animate,direction)
            this.current_page = this.popups[page]
            let html = await this.popups[page].getHtml()
            document.getElementById(this.current_page.name).innerHTML = html
            setTimeout(async function (){
                if(self.current_page.name !== 'PageLogin')
                    await bhouse.Menu.showMenu()
                else if(self.current_page.name === 'PageLogin')
                    await bhouse.Menu.hideMenu()
                    
                document.getElementById(self.current_page.name).style.display='block'
                document.getElementById(self.current_page.name).style.pointerEvents='all'
            },500)
            await this.popups[page].bindEvents()
        }
    }

    async bindEvents(){
    }    
    
    async hide(name,animate,direction){
        
        if(this.current_page.name === 'PageLogin')
            await bhouse.Menu.hideMenu()
        
        if( animate === undefined || animate === null )
            animate = true
            
        if(animate){
            if(direction === 'right'){
                document.getElementById(name).style.transform  = 'translateX(-100%)'
                document.getElementsByTagName('menu')[0].style.transform  = 'translateX(-100%)'
            }else if(direction === 'left'){
                document.getElementById(name).style.transform  = 'translateX(100%)'
                document.getElementsByTagName('menu')[0].style.transform  = 'translateX(100%)'
            }
                
            document.getElementById(name).style.transition         = 'transform 1s'
            document.getElementsByTagName('menu')[0].style.transition = 'transform 1s'
            
            setTimeout(async function(){
                document.getElementById(name).innerHTML              = ''
                document.getElementById(name).style.display          = 'none'
                document.getElementById(name).style.pointerEvents    = 'none'
                document.getElementById(name).style.transition       = ''
                document.getElementById(name).style.transform        = ''
                document.getElementsByTagName('menu')[0].style.transition = ''
                document.getElementsByTagName('menu')[0].style.transform  = ''
            },500)
        }else{
            document.getElementById(name).innerHTML           = ''
            document.getElementById(name).style.display       = 'none'
            document.getElementById(name).style.pointerEvents = 'none'
            document.getElementById(name).style.transition = ''
            document.getElementById(name).style.transform  = ''
        }

    }

    async generateComponentTag(){
        for(let component of this.elements){
            let link = document.createElement('link')
            link.type = 'text/css'
            link.rel = 'stylesheet'
            link.href = settings.url.frontend+"/components/"+component.name+"/template.css"
            document.head.appendChild(link)
            document.getElementById('app').innerHTML += `<div class="popup" id=${component.name} ></div>`
            let el                 = document.getElementById(component.name)
            el.style.display       = 'none'
            el.style.pointerEvents = 'none'
        }
    }
}