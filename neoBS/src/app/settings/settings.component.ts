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
  basicDataSource: Array<SourceType>;
  currentBsConfigData: Array<neoBsType>;


  //basicDataSource: Array<SourceType> = JSON.parse(JSON.stringify(originSource.slice(0, 6)));
  dataTableOptions = {
    columns: [
      {
        field: 'codeId',
        header: 'Code ID',
        fieldType: 'text'
      },
      {
        field: 'codeName',
        header: 'Code Name',
        fieldType: 'text'
      },
      {
        field: 'codeAliasName',
        header: 'Code Alias Name',
        fieldType: 'text'
      },
      {
        field: 'codeRegion',
        header: 'Code Region',
        fieldType: 'text'
      },
      {
        field: 'costPrice',
        header: 'Code Price',
        fieldType: 'text'
      },
      {
        field: 'shareNumber',
        header: 'Share Number',
        fieldType: 'text'
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
      field: 'codeId',
      width: '150px'
    },
    {
      field: 'codeName',
      width: '150px'
    },
    {
      field: 'codeAliasName',
      width: '150px'
    },
    {
      field: 'codeRegion',
      width: '150px'
    },
    {
      field: 'costPrice',
      width: '150px'
    },
    {
      field: 'shareNumber',
      width: '150px'
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
    console.log(rowIndex);
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
    if (JSON.stringify(this.localStorageService.getObject('bsConfig')) === '{}' || this.localStorageService.getObject('bsConfig').length === 0){
      // Generate init bs config data
      const initData = [];
      initData.push(
        {
          codeId: '600009',
          codeName: 'Shanghai plane',
          codeAliasName: 'SJ',
          codeRegion: 'sh',
          costPrice: '0.00',
          shareNumber: '0'
        }
      );
      initData.push(
        {
          codeId: '002475',
          codeName: 'Immediately Precision',
          codeAliasName: 'LX',
          codeRegion: 'sz',
          costPrice: '0.00',
          shareNumber: '0'
        }
      );
      this.localStorageService.setObject('bsConfig', initData);
      console.log('bsConfig is null, generate init data successfully.');
    }
    this.currentBsConfigData = this.localStorageService.getObject('bsConfig') as Array<neoBsType>;
    this.basicDataSource = JSON.parse(JSON.stringify(this.currentBsConfigData));
  }

  loadRealData(): void{
    let bsJsonInitData: Array<SourceType>;
    let bsConfigJson;
    const neoOriginSource = [];
    const bsConfigString: string = this.localStorageService.get('bsConfig');
    if(bsConfigString != null){
      bsConfigJson = JSON.parse(JSON.stringify(bsConfigString));
    }else{
      // init data by default
    }
    console.log(bsConfigJson);

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

  deleteItem(): void{
    console.log(this.datatable.getCheckedRows());
    // Support multi delete
    for (let i = 0; i < this.datatable.getCheckedRows().length; i++) {
      let deleteIndex;
      deleteIndex = this.currentBsConfigData.findIndex(element => element.codeId === this.datatable.getCheckedRows()[i].codeId);
      this.currentBsConfigData.splice(deleteIndex, 1);
    }
    this.localStorageService.setObject('bsConfig', this.currentBsConfigData);
    this.basicDataSource = JSON.parse(JSON.stringify(this.currentBsConfigData));
    window.alert('Select item which index is xxx deleted' + this.datatable.getCheckedRows());
  }


  updateName(name: string): void {
    this.name.setValue(name);
    this.localStorageService.set('Name', this.name.value);
  }



}

export interface neoBsType{
  codeId: string;
  codeName: string;
  codeAliasName: string;
  codeRegion: string;
  costPrice: number;
  shareNumber: number;
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
