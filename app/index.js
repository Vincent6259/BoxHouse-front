import PagesManager     from './components/PagesManager/PagesManager.js'
import PopupsManager    from './components/PopupsManager/PopupsManager.js'

/* -- CONST -- */
import { settings } from './settings.js'
import { bhouse }   from './bhouse.js'

class Main{
    constructor(){
        bhouse['PagesManager']  =  new PagesManager(bhouse) 
        bhouse['PopupsManager'] =  new PopupsManager(bhouse) 
    }
}
new Main()