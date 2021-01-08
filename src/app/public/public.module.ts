import { NgModule } from '@angular/core';

import { SharedModule } from '../core/shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
    imports: [
        PublicRoutingModule,
        SharedModule
    ],
    declarations: [],
    exports: [],
    providers: []
})

export class PublicModule {
    constructor(){}
}