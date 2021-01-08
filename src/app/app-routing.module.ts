import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './core/shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public-routing.module').then(m => m.PublicRoutingModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
