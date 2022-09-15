import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  set(key: string, value: any): void {
    localStorage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value);
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  delete(key: string): any {
    localStorage.removeItem(key);
  }
}
