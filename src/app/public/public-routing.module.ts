import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';

const routes:Routes = [
    { path: '', component: AppComponent, children:[
        { path: 'upload', component: UploadFileComponent }
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PublicRoutingModule {}