import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
    imports: [
        RouterModule
    ],
    declarations: [
        NotFoundComponent
    ],
    exports: [
        RouterModule,
        NotFoundComponent
    ],
    providers: []
})

export class SharedModule {
    constructor() {}
}