import { TestBed } from '@angular/core/testing';

import { ItemService } from './shopping-list.service';

describe('ShoppingListService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
