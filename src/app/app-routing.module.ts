import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StorageHomeComponent } from './components/storage-home/storage-home.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

const routes: Routes = [
  { path: '', component: StorageHomeComponent, pathMatch: 'full' },
  { path: 'upload-file/:path', component: UploadFileComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
