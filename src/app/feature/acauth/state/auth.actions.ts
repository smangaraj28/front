import {User} from '../models/auth.model';

// Actions
export class CheckSession {
    static type = '[Loginview] CheckSession';
}

export class LoginSuccess {
    static type = '[Auth] LoginSuccess';

    constructor(public user: User, public token, public tokenClaims, public sessionid, public usertype) {
    }
}

export class SessionExists {
    static type = '[Auth] SessionExists';

    constructor(public user: User) {
    }
}

export class LogoutSuccess {
    static type = '[Auth] LogoutSuccess';
}

export class LoginFailed {
    static type = '[Auth] LoginFailed';
}


// Events
