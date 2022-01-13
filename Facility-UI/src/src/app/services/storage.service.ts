import { Injectable } from '@angular/core';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';

// import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // constructor(private storage: NativeStorage) {}

  // // Create and expose methods that users of this service can
  // // call, for example:
  // public async set(key: string, value: any) {
  //   await this.storage?.setItem(key, JSON.stringify(value));
  // }
  // public get(key: string) {
  //   this.storage?.getItem(key).then(
  //     data => {
  //       return (data)
  //     },
  //     error => {
  //       return (null)
  //     }
  //   )
  // }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getLocalStorage(key: string) {
   return JSON.parse(localStorage.getItem(key))
  }

  removeStorage(key: string) {
    localStorage.removeItem(key)
  }
}