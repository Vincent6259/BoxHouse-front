/* -- CORE -- */
import Auth         from '../../core/Auth.js'
import Database     from '../../core/Database.js'
import Network      from '../../core/Network.js'
import Toolbox      from '../../shared/js/Toolbox.js'

/* -- PAGES -- */
import PageLogin    from '../PageLogin/PageLogin.js'
import PageHome     from '../PageHome/PageHome.js'
import Menu         from '../Menu/Menu.js'

/* -- CONST -- */
import { settings } from '../../settings.js'
import { bhouse }   from '../../bhouse.js'

export default class PagesManager {
    
    constructor() {  
        this.current_page = null
        this.components  = [
                { class: PageLogin, name: 'PageLogin', style:'template.css' },
                { class: PageHome,  name: 'PageHome',   style:'template.css' },
            ]
        this.tools = [
            { class: Menu, name: 'Menu', style:'template.css' },
        ]
        this.pages      = {}
        bhouse.core.toolbox  = new Toolbox()
        bhouse.core.auth     = new Auth()
        bhouse.core.database = new Database()
        this.load()
        
    }
    async load(){

        for( let component of this.tools ){
            if( !this.pages[component.name] ) this.pages[component.name] = new component.class(bhouse) 
        }
        for( let component of this.components ){
            if( !this.pages[component.name] ) this.pages[component.name] = new component.class(bhouse) 
        }
        
        await this.generateComponentTag()
        
        await this.bindEvents()
        
        if( bhouse.core.auth.firstConnection() && !sessionStorage.getItem('session') )
            await this.goToLogin()  
        else if( !bhouse.core.auth.firstConnection() && sessionStorage.getItem('session') )
            await this.show('PageHome')
        else if( bhouse.core.auth.firstConnection() && sessionStorage.getItem('session') )  
            await this.show('PageHome')
        else 
            goToLogin()
        
        window.test = bhouse
            
    }
    
    async show(args){ 
        let page       = args.page      || 'PageHome'
        let direction  = args.direction || 'right'
        let animate    = args.animate   || true

        let view = null, tag  = null, self = this
        if( this.current_page === null ){
            this.current_page = this.pages[page] // FIRST LOAD OF THE APP LOGICALLY
            let html = await this.pages[page].getHtml()
            await this.pages[page].toolbox.doNotFuckWithMe()
            await this.pages[page].load()
            console.log('tkt')
            document.getElementById(this.current_page.name).innerHTML           = html
            document.getElementById(this.current_page.name).style.display       ='block'
            document.getElementById(this.current_page.name).style.pointerEvents ='all'
            if(this.current_page.name !== 'PageLogin')
                await this.pages.Menu.showMenu()
            else if(this.current_page.name === 'PageLogin')
                await this.pages.Menu.hideMenu()
            
            await this.pages[page].bindEvents()
        }
        else if ( this.current_page !== null ) {
            await this.hide(this.current_page.name,animate,direction)
            this.current_page = this.pages[page]
            let html = await this.pages[page].getHtml()
            document.getElementById(this.current_page.name).innerHTML = html
            setTimeout(async function (){
                if(self.current_page.name !== 'PageLogin')
                    await this.pages.Menu.showMenu()
                else if(self.current_page.name === 'PageLogin')
                    await this.pages.Menu.hideMenu()
                    
                document.getElementById(self.current_page.name).style.display='block'
                document.getElementById(self.current_page.name).style.pointerEvents='all'
            },500)
            await this.pages[page].bindEvents()
        }
    }

    async bindEvents(){
    }    
    
    async hide(name,animate,direction){
        
        if(this.current_page.name === 'PageLogin')
            await this.pages.Menu.hideMenu()
        
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
    async goToLogin(){
        let component = this.pages.find(page => page.name === 'PageLogin' )
        let view = component.class
        this.pages['PageLogin'] = new view(bhouse)
        if( this.current_page === null ){
            this.current_page = view // FIRST LOAD OF THE APP LOGICALLY
            let html = await this.pages[this.current_page.name].getHtml()
            document.getElementById(this.current_page.name).innerHTML = html
            document.getElementById(this.current_page.name).style.display='block'
            document.getElementById(this.current_page.name).style.pointerEvents='all'
            await this.pages[this.current_page.name].bindEvents()
        }
    }
    
    async generateComponentTag(){
        let default_css  = document.createElement('link')
        default_css.type = 'text/css'
        default_css.rel  = 'stylesheet'
        default_css.href = settings.url.frontend+"styles.css"
        for(let component of this.components ){

            let link = document.createElement('link')
            link.type = 'text/css'
            link.rel = 'stylesheet'
            link.href = settings.url.frontend+"/components/"+component.name+"/template.css"
            document.head.appendChild(link)
            document.getElementById('app').innerHTML += `<div class="page" id=${component.name} ></div>`
            let el                 = document.getElementById(component.name)
            el.style.display       = 'none'
            el.style.pointerEvents = 'none'
        }
        for(let component of this.tools){
            let link = document.createElement('link')
            link.type = 'text/css'
            link.rel = 'stylesheet'
            link.href = settings.url.frontend+"/components/"+component.name+"/template.css"
            document.head.appendChild(link)
            document.getElementById('app').innerHTML += `<${component.name}>${ await this.pages.Menu.getHtml() }</${component.name}>`
            let el                 = document.getElementsByTagName(component.name)[0]
            el.style.display       = 'none'
            el.style.pointerEvents = 'none'
        }
    }
}