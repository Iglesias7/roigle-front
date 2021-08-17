import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  loading = new BehaviorSubject<boolean>(false);

  hide() {
    this.loading.next(false);
  }

  display() {
    this.loading.next(true);
  }

  isLoading(): boolean {
    return this.loading.value;
  }
}
