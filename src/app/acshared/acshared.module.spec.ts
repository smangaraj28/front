import { AcsharedModule } from './acshared.module';

describe('AcsharedModule', () => {
  let acsharedModule: AcsharedModule;

  beforeEach(() => {
    acsharedModule = new AcsharedModule();
  });

  it('should create an instance', () => {
    expect(acsharedModule).toBeTruthy();
  });
});
