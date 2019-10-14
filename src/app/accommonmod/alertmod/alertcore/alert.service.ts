import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

  /// Notify users about errors and other helpful stuff
  export interface Msg {
    id: string;
    content: string;
    style: string;
    type: string;
    canclose: string;
  }

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private unq_id_seq = 0;
  private _notimsgSource = new Subject<Msg[] | null>();
  private _alrtmsgSource = new Subject<Msg[] | null>();
  private _bannermsgSource = new Subject<Msg[] | null>();

  notimsg1: Msg[] = [];
  alertmsg1: Msg[] = [];
  bannermsg1: Msg[] = [];

  notimsg = this._notimsgSource.asObservable();
  alertmsg = this._alrtmsgSource.asObservable();
  bannermsg = this._bannermsgSource.asObservable();
  timer: any;


  // Timer related changes START

  alertticks = 0;
  m: any;


  // TImer related changes END



  update(id: string, content: string, style: 'error' | 'info' | 'success', type: 'notification' | 'alert' | 'banner', canclose: 'yes' | 'no') {
    if (type === 'notification') {
        const msg: Msg = { id, content, style, type, canclose };
        this.notimsg1.push(msg);
        this._notimsgSource.next(this.notimsg1);
    } else if (type === 'alert') {
        console.log('insdie alert');
        const msg: Msg = { id, content, style, type, canclose };
        this.alertmsg1.pop();
        this.alertmsg1.push(msg);
        console.log(JSON.stringify(this.alertmsg1));
        this._alrtmsgSource.next(this.alertmsg1);
        // this.starttimer();
    } else if (type === 'banner') {
        const msg: Msg = { id, content, style, type, canclose };
        this.bannermsg1.push(msg);
        this._bannermsgSource.next(this.bannermsg1);
    }
  }
  /*
  starttimer(){
  this.timer = Observable.timer(2000,1000); 
  this.m = this.timer.subscribe(t=> 
                        {
                         
                          this.alertticks=20-t;
                          if(this.alertticks==0){                              
                            this.clearalertmsg();                   
                               
                          }
                        } );
  }
*/

  clearnotifcation() {

    // this._notimsgSource.next(null);

    this.notimsg1 = [];
    this._notimsgSource.next(this.notimsg1);
  }

  clearalertmsg() {
    this._alrtmsgSource.next(null);
    if (typeof this.m !== 'undefined') {
      this.m.unsubscribe();
   }
  }

  clearbannermsg() {
    this._bannermsgSource.next(null);
  }

  clearall() {
    this.clearnotifcation();
    this.clearalertmsg();
    this.clearbannermsg();
  }

  get_unq_id () {
    this.unq_id_seq = this.unq_id_seq + 1;
    const unq_id = 'noti' + this.unq_id_seq;
    return unq_id;
  }

}
/*
  private _msgSource = new Subject<Msg | null>();

  msg = this._msgSource.asObservable();

  update(content: string, style: 'error' | 'info' | 'success') {
    const msg: Msg = { content, style };
    this._msgSource.next(msg);      
  }

  clear() {
    this._msgSource.next(null);
  }
  */