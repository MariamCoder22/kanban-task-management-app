import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ModalService {
  viewContainerRef!: ViewContainerRef;

  init(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  open<T>(component: any, data?: { [key: string]: any }): ComponentRef<T> {
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent<T>(component);
    if (data) {
      Object.keys(data).forEach(key => {
        (componentRef.instance as {[key: string]: any})[key] = data[key];
      })
    }
    return componentRef;
  }

  close(): void {
    this.viewContainerRef.clear();
  }

}
