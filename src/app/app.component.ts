import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from './services/general-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public absolutePath:Array<string>;
  public dirs:Array<string>;
  public files:Array<string>;

  private routeSearch:any;
  private mainPath:string;

  constructor(
    private _generalService: GeneralServiceService
  ) {
    this.absolutePath = [];
    this.mainPath = "";
    this.dirs = [];
    this.files = [];
    this.onRefreshContent("MyStorage", false);
  }

  router(routeSelected:any){
    let relativePath = "";
    let currentRelativePath = [];
    let i = 0;
    this.mainPath = "";
    for (let route of this.absolutePath) {
      if (route != "MyStorage") {
        relativePath += route;
        this.mainPath += route != "/" ? route : "";
      }
      currentRelativePath.push(route);
      if (i == 1) relativePath = relativePath.substring(0, relativePath.length - 2);
      if(routeSelected == i) break;
      i++;
    }
    currentRelativePath.push("/");
    this.absolutePath = currentRelativePath;
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

  ngOnInit(): void {
  }

  title = 'mydrive';
}
