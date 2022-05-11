import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private data: any;

  constructor() {}

  public setData(data: any) {
    this.data = data;
  }

  public getData(): any {
    return this.data;
  }
}
