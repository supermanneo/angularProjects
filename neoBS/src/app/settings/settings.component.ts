import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import { DataTableComponent, TableCheckOptions, TableWidthConfig } from 'ng-devui/data-table';
import { originSource, SourceType } from './settings-mock';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  name = new FormControl('');
  @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  // totalData = JSON.parse(JSON.stringify(originSource));
  basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'firstName',
        header: 'First Name',
        fieldType: 'text'
      },
      {
        field: 'lastName',
        header: 'Last Name',
        fieldType: 'text'
      },
      {
        field: 'gender',
        header: 'Gender',
        fieldType: 'text'
      },
      {
        field: 'dob',
        header: 'Date of birth',
        fieldType: 'date'
      }
    ]
  };


  constructor(private localStorageService: LocalStorageService) { }

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'checkbox',
      width: '55px'
    },
    {
      field: '#',
      width: '50px'
    },
    {
      field: 'firstName',
      width: '150px'
    },
    {
      field: 'lastName',
      width: '150px'
    },
    {
      field: 'gender',
      width: '150px'
    },
    {
      field: 'dob',
      width: '200px'
    }
  ];

  checkOptions: TableCheckOptions[] = [
    {
      label: '全选所有数据',
      onChecked: this.checkTotalData.bind(this)
    },
    {
      label: '全选当前页数据',
      onChecked: this.checkPageData.bind(this)
    }
  ];

  pager = {
    total: 12,
    pageIndex: 1,
    pageSize: 6
  };

  totalDataChecked = false;

  checkTotalData(): void {
    this.datatable.setTableCheckStatus(
      {
        pageAllChecked: true
      }
    );
    this.totalDataChecked = true;
  }

  checkPageData(): void {
    this.datatable.setTableCheckStatus(
      {
        pageAllChecked: true
      }
    );
    this.totalDataChecked = false;
  }

  onRowCheckChange(checked, rowIndex, nestedIndex, rowItem): void {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked
    });
    console.log(rowIndex)
  }

  onPageIndexChange(pageIndex): void {
    this.basicDataSource = JSON.parse(JSON.stringify(originSource.slice(pageIndex - 1, pageIndex + 5)));
    setTimeout(() => {
      if (this.totalDataChecked) {
        this.datatable.setTableCheckStatus(
          {
            pageAllChecked: true
          }
        );
      } else {
        this.datatable.setTableCheckStatus(
          {
            pageAllChecked: false
          }
        );
      }
    });
  }

  ngOnInit(): void {

    if (this.localStorageService !== null) {

    } else {
      // Generate init bs config data

    }
  }

  loadRealData(): void{
    let bsJsonInitData: Array<SourceType>;
    const neoOriginSource = [];
    for (let i = 10; i <= 11; i++){
      neoOriginSource.push({
        id: i,
        firstName: 'Neo',
        lastName: 'Otto',
        dob: new Date(1987, 10, 1),
        gender: 'Male',
      });
    }


    bsJsonInitData = JSON.parse(JSON.stringify(neoOriginSource));
    this.basicDataSource = bsJsonInitData;
    console.log(bsJsonInitData);
  }


  updateName(name: string): void {
    this.name.setValue(name);
    this.localStorageService.set('Name', this.name.value);
  }



}

export interface neoSourceType {
  id?: number;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  detail?: string;
  $checked?: boolean;
  $expandConfig?: any;
  children?: any;
  chosen?: boolean;
  $isChildTableOpen?: boolean;
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
