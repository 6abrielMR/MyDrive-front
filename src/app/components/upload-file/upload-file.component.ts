import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @ViewChild("currentFiles", { read: ElementRef }) currentFiles: any;

  public filesToUpload:Array<any>;
  public isFiles:boolean;

  constructor() {
    this.filesToUpload = [];
    this.isFiles = false;
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

}
