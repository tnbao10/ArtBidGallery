import {DOCUMENT} from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable(
    {
        providedIn : "root"
    }
)

export class Conect{
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
        // script.defer = true;
        this.document.body.appendChild(script);
    }
    public addStyle(styleSrc: string) {
        const link = this.document.createElement('link');
        link.rel = 'stylesheet';
        link.href = styleSrc;
        link.type = 'text/css';
        this.document.head.appendChild(link);
    }
    public addScriptDefer(scriptSrc: string) {
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        script.defer = true;
        this.document.head.appendChild(script);
    }
    public addScriptAsync(scriptSrc: string) {
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        script.async = true;
        this.document.head.appendChild(script);
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
        scripts.forEach(script => script.remove());
    }
    
    public removeStyle(styleSrc: string) {
        const styles = this.document.querySelectorAll('link[href="' + styleSrc + '"]');
        styles.forEach(style => style.remove());
    }
}