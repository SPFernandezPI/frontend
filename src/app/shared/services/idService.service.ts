import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdStorageService {
  private storedId: number | null = null;

  constructor() {}

  saveId(id: number): void {
    this.storedId = id;
  }

  getId(): number | null {
    return this.storedId;
  }
}
