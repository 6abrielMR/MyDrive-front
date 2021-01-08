import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralServiceService } from 'src/app/services/general-service.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-storage-home',
  templateUrl: './storage-home.component.html',
  styleUrls: ['./storage-home.component.css']
})
export class StorageHomeComponent implements OnInit {

  public absolutePath:Array<string>;
  public dirs:Array<string>;
  public files:Array<string>;
  public currentFilename:string;
  public currentFieldChangeState: FormGroup;
  public isRename:boolean;
  public isDelete:boolean;
  public mainDownloadPath:string;
  public downloadPath:string;

  private routeSearch:any;
  private mainPath:string;

  constructor(
    private _generalService: GeneralServiceService,
    private modalService: NgbModal
  ) {
    this.absolutePath = [];
    this.mainPath = "";
    this.mainDownloadPath = Global.download_path;
    this.downloadPath = "";
    this.dirs = [];
    this.files = [];
    this.currentFilename = "";
    this.isRename = true;
    this.isDelete = true;
    this.currentFieldChangeState = new FormGroup({
      fieldToChange: new FormControl('', Validators.required),
    });
    this.onRefreshContent("MyStorage", false);
  }

  router(routeSelected:any){
    let relativePath = "";
    let currentRelativePath = [];
    let i = 0;
    this.mainPath = "";
    this.downloadPath = "";
    for (let route of this.absolutePath) {
      if (route != "MyStorage") {
        relativePath += route;
        this.mainPath += route != "/" ? route : "";
        this.downloadPath += route != "/" ? route : "";
      }
      currentRelativePath.push(route);
      if (i == 1) relativePath = relativePath.substring(0, relativePath.length - 2);
      if(routeSelected == i) break;
      i++;
    }
    currentRelativePath.push("/");
    this.absolutePath = currentRelativePath;
    console.log(this.downloadPath);
    this.onRefreshContent(relativePath, true);
  }

  onRefreshContent(path:string, isIndicatorPath:boolean) {
    if (isIndicatorPath) {
      this.dirs = [];
      this.files = [];
      this.routeSearch = {
        "pathToSearch": path
      };
      this._generalService.fetchElements(this.routeSearch).subscribe(
        response => {
          this.dirs = response.data.dirs;
          this.files = response.data.files;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.absolutePath.push(path);
      this.absolutePath.push("/");
      this.mainPath += path == "MyStorage" ? "" : "/" + path;
      this.downloadPath += path == "MyStorage" ? "" : "-" + path;
      this.dirs = [];
      this.files = [];
      this.routeSearch = {
        "pathToSearch": this.mainPath
      };
      this._generalService.fetchElements(this.routeSearch).subscribe(
        response => {
          this.dirs = response.data.dirs;
          this.files = response.data.files;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  renameElement(): void {
    let currentAbsolutePath, newAbsolutePath;
    if (this.mainPath == "") {
      currentAbsolutePath = this.mainPath + this.currentFilename;
      newAbsolutePath = this.mainPath + this.currentFieldChangeState.controls['fieldToChange'].value;
    } else {
      currentAbsolutePath = this.mainPath.replace('/', '') + '/' + this.currentFilename;
      newAbsolutePath = this.mainPath.replace('/', '') + "/" + this.currentFieldChangeState.controls['fieldToChange'].value;
    }
    let data = {
      "currentName": currentAbsolutePath,
      "nameToChange": newAbsolutePath
    };
    this._generalService.renameElement(data).subscribe(
      response => {
        console.log(response);
        if(response.state == "Success") {
          this.onRefreshContent(this.mainPath.replace('/', ''), true);
          this.modalService.dismissAll();
        }
        else this.isRename = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  downloadFile(filename:string): void {
    let currentFileToDownload;
    if (this.mainPath == "")
    currentFileToDownload = this.mainPath + filename;
    else
    currentFileToDownload = this.mainPath.replace('/', '') + '/' + filename;
    let fileToDownload = {
      "fileToDownload": currentFileToDownload
    };
    this._generalService.downloadFile(fileToDownload).subscribe(
      err => {
        console.log(err);
      } 
    );
  }

  deleteElement(): void {
    let currentAbsolutePath;
    if (this.mainPath == "")
      currentAbsolutePath = this.mainPath + this.currentFilename;
    else
      currentAbsolutePath = this.mainPath.replace('/', '') + '/' + this.currentFilename;
    let elementToDelete = {
      "elementName": currentAbsolutePath
    };
    this._generalService.deleteElement(elementToDelete).subscribe(
      response => {
        console.log(response);
        if(response.state == "Success") {
          this.onRefreshContent(this.mainPath.replace('/', ''), true);
          this.modalService.dismissAll();
        }
        else this.isDelete = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
  }

  // Modals for actions of elements (dirs and files)
  openRenameElement(renameE:any, filename:string):void {
    this.currentFieldChangeState.reset();
    this.currentFilename = filename;
    this.modalService.open(renameE, { centered: true });
  }

  openDeleteElement(deleteE:any, filename:string):void {
    this.currentFieldChangeState.reset();
    this.currentFilename = filename;
    this.modalService.open(deleteE, { centered: true });
  }

  title = 'mydrive';

}
