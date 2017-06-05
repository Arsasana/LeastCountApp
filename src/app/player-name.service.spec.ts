import { TestBed, inject } from '@angular/core/testing';

import { PlayerNameService } from './player-name.service';

describe('PlayerNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerNameService]
    });
  });

  it('should be created', inject([PlayerNameService], (service: PlayerNameService) => {
    expect(service).toBeTruthy();
  }));
});
