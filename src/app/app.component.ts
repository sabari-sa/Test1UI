import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ELEMENT_DATA: Element[] = [];
  constructor(private http: HttpClient) { }

  name = 'Angular Multi Select Dropdown';
  dropdownListMake: any = [];
  dropdownList: SelectItem[] = [];;
  selectedItems: any = [];
  dropdownSettings = {};
  errorMessage: any;


  //model data
  dropdownListModel: any;
  selectedItemsModel: any;

  dropdownListYear: any;
  selectedItemsYear: any;

  displayedColumns:any;
  dataSource:any;

  renameKey(obj: any, oldKey: any, newKey: any) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

  ngOnInit() {
    debugger;
    this.http.get<any>('http://localhost:3000/gettask').subscribe({
      next: (data: SelectItem[]) => {
        const arr = data;
        arr.forEach(obj => this.renameKey(obj, 'make', 'itemName'));
        const updatedJson = arr;
        this.dropdownList = updatedJson;
        this.dropdownListModel = updatedJson;
        this.dropdownListYear = updatedJson;
        this.ELEMENT_DATA = updatedJson;

        // Table field
        this.displayedColumns = ['id', 'engine', 'itemName', 'model', 'status', 'trim', 'year'];
        this.dataSource = new MatTableDataSource<Element>(this.dropdownList);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })

    this.dropdownList = this.dropdownListMake;
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Countries',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  onItemSelect(item: any, proname: any) {
    debugger;
    var res: any = [];
    console.log(item);
    console.log("on Item Select", this.selectedItems);

    if (proname == "make") {
      var data = this.selectedItems.filter((x: any) => x.model)
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < this.dropdownList.length; j++) {
          if (res[j]?.model != data[i].model) {
            if (this.dropdownList[j].model == data[i].model) {
              res.push(this.dropdownList[j]);
            }
          }
        }
      }
      this.dropdownListModel = res;
      this.dataSource  = this.dropdownListModel;
    }
    else if (proname == "model") {
      var data = this.selectedItems.filter((x: any) => x.year)
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < this.dropdownList.length; j++) {
          if (res[j]?.year != data[i].year) {
            if (this.dropdownList[j].year == data[i].year && this.dropdownList[j].itemName == data[i].itemName && this.dropdownList[j].model == data[i].model) {
              res.push(this.dropdownList[j]);
            }
          }
        }
      }
      this.dropdownListYear = res;
      this.dataSource  = this.dropdownListYear;
    }


  }
  OnItemDeSelect(item: any) {
    debugger;
    console.log(item);
    console.log("On Item DeSelect", this.selectedItems);
  }
  onSelectAll(items: any) {
    debugger;
    console.log("on Select All", items);
  }
  onDeSelectAll(items: any) {
    debugger;
    console.log("on DeSelect All", items);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

interface SelectItem {
  id: number;
  make: string;
  model: string;
  year: string;
  trim: string;
  engine: string;
  status: number;
  itemName: string;
}

export interface Element {
  id: number;
  make: string;
  model: string;
  year: string;
  trim: string;
  engine: string;
  status: number;
  itemName: string;
}