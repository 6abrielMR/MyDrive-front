import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/services/general-service.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @ViewChild("currentFiles", { read: ElementRef }) currentFiles: any;

  public filesToUpload:Array<any>;
  public isFiles:boolean;
  public isError:boolean;
  public errorMessage:string;

  private pathToUpload:string;

  constructor(private _generalService: GeneralServiceService, private pathRelative:ActivatedRoute, private router:Router) {
    this.pathToUpload = pathRelative.snapshot.params.path;
    this.filesToUpload = [];
    this.isFiles = false;
    this.isError = false;
    this.errorMessage = "";
  }

  ngOnInit(): void {
  }

  filesUploaded() {
    for (let file of this.currentFiles.nativeElement.files) this.filesToUpload.push(file);
    this.isFiles = true;
  }

  deleteFile(filename:string) {
    const currentFilenames = [];
    for (let file of this.filesToUpload) currentFilenames.push(file.name);
    let fileToDelete = currentFilenames.indexOf(filename);
    this.filesToUpload.splice(fileToDelete, 1);
  }

  uploadFiles() {
    let formData:FormData = new FormData();
    for (let file of this.filesToUpload) formData.append('filesToUpload', file, file.name);
    if (this.pathToUpload.length == 0) this.pathToUpload = "-";
    this._generalService.uploadFiles(this.pathToUpload, formData).subscribe(
      response => {
        if (response.state == "Success") this.router.navigate(['']);
        this.isError = true;
        this.errorMessage = response.message;
      },
      err => {
        console.log(err);
      }
    );
  }

}
