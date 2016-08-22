import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DeprecatedFormsModule} from '@angular/common';
import {AppComponent} from './app';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, DeprecatedFormsModule],
    bootstrap: [AppComponent]
})
export class MyAppModule {}

platformBrowserDynamic().bootstrapModule(MyAppModule);