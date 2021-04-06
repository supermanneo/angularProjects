import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}

interface NeoGlobalSettingsDataType{
  id: number;
  codeId: string;
  codeName: string;
  codeAliasName: string;
  codeRegion: string;
  costPrice: number;
  shareNumber: number;
  $expandConfig?: any;
}

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})



export class GlobalSettingsComponent implements OnInit {
  editCache: { [key: string]: { edit: boolean; data: NeoGlobalSettingsDataType } } = {};
  listOfData: NeoGlobalSettingsDataType[] = [];
  currentBsConfigData: Array<NeoGlobalSettingsDataType>;
  currentMaxId = -1;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    //this.localStorageService.remove('bsConfig');
    if (JSON.stringify(this.localStorageService.getObject('bsConfig')) === '{}' || this.localStorageService.getObject('bsConfig').length === 0){
      // Generate init bs config data
      const initData = [];
      initData.push(
        {
          id: 1,
          codeId: '1A0001',
          codeName: 'Shanghai',
          codeAliasName: 'SJ',
          codeRegion: 'sh',
          costPrice: 0.00,
          shareNumber: 0
        }
      );
      this.localStorageService.setObject('bsConfig', initData);
    }

    this.currentBsConfigData = this.localStorageService.getObject('bsConfig') as Array<NeoGlobalSettingsDataType>;
    this.listOfData = this.currentBsConfigData;
    this.refreshCurrentMaxId();
    this.updateEditCache();
  }

  deleteRow(id: number): void {
    const deleteLocalIndex = this.currentBsConfigData.findIndex(item => item.id === id);
    this.currentBsConfigData.splice(deleteLocalIndex, 1);
    this.listOfData = [
      ...this.currentBsConfigData
    ];
    this.localStorageService.setObject('bsConfig', this.currentBsConfigData);
    this.refreshCurrentMaxId();
    this.updateEditCache();
  }

  refreshCurrentMaxId(): void{
    for(let i = 0; i < this.currentBsConfigData.length; i++){
      if (this.currentBsConfigData[i].id >= this.currentMaxId){
        this.currentMaxId = this.currentBsConfigData[i].id + 1;
      }
    }
  }

  addRow(): void {
    this.refreshCurrentMaxId();
    const initData = {
      id: this.currentMaxId,
      codeId: `Name ${this.currentMaxId}`,
      codeName: '',
      codeAliasName: '',
      codeRegion: 'sh',
      costPrice: 0.00,
      shareNumber: 0,
    };
    this.listOfData = [
      ...this.listOfData,
      initData
    ];
    this.currentBsConfigData = [
      ...this.currentBsConfigData,
      initData
    ];
    this.localStorageService.setObject('bsConfig', this.currentBsConfigData);
    this.updateEditCache();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    const localDataIndex = this.currentBsConfigData.findIndex(item => item.id === id);
    Object.assign(this.currentBsConfigData[localDataIndex], this.editCache[id].data);
    this.localStorageService.setObject('bsConfig', this.currentBsConfigData);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

}
