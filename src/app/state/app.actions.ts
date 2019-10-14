import { appdefaults } from '../models/app.models';

export class setAppDefaults {
    static readonly type = '[appcomponent] setappdefaults';
    constructor (public payload: appdefaults) {}
  }
  
  export class delAppDefaults {
    static readonly type = '[appcomponent] delappdefaults';
  }

  export class AppDefaultsSetSuccess {
    static readonly type = '[appcomponent] appdefaultssetsuccess';
  }
  

  export class AppDefaultsSetFailed {
    static readonly type = '[appcomponent] AppDefaultsSetFailed';
  }


    