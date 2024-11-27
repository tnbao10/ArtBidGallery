import {DOCUMENT} from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable(
    {
        providedIn : "root"
    }
)

export class Conect implements OnDestroy{
    private theme = new BehaviorSubject<boolean>(false);

    routerSubscription: Subscription
    cureURL : string
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private router: Router

    ) {}
    ngOnDestroy(): void {
        if(this.routerSubscription){
          this.routerSubscription.unsubscribe()
        }
    }
    public addScript(scriptSrc: string) {
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        script.defer = true;
        // this.document.head.appendChild(script);
        // setTimeout(()=>{},500)
        this.document.head.appendChild(script)
    }
    public addScriptDefer(scriptSrc: string) {
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        // script.defer = true;
        // this.document.body.appendChild(script);
        setTimeout(()=>{this.document.body.appendChild(script)},200)

    }
    public addScriptAsync(scriptSrc: string) {
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        // script.defer = true;
        setTimeout(()=>{this.document.body.appendChild(script)},2000)
    }
    public addStyle(styleSrc: string) {
        const link = this.document.createElement('link');
        link.rel = 'stylesheet';
        link.href = styleSrc;
        link.type = 'text/css';
        // this.document.head.appendChild(link);
        this.document.head.appendChild(link)

    }
    public reloadPage(){
        this.routerSubscription = this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd){
                window.location.reload()
            }
        });
    }
    public removeScript(scriptSrc: string) {
        const scripts = this.document.querySelectorAll('script[src="' + scriptSrc + '"]');
        scripts.forEach(script => script.remove())

        
    }
    
    public removeStyle(styleSrc: string) {
        const styles = this.document.querySelectorAll('link[href="' + styleSrc + '"]');
        styles.forEach(style => style.remove())

        
    }
    setData(data: boolean) {
        this.theme.next(data);
    }
    getData() {
        return this.theme.asObservable();
    }
}