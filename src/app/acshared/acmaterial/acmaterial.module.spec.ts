import { AcmaterialModule } from './acmaterial.module';

describe('AcmaterialModule', () => {
  let acmaterialModule: AcmaterialModule;

  beforeEach(() => {
    acmaterialModule = new AcmaterialModule();
  });

  it('should create an instance', () => {
    expect(acmaterialModule).toBeTruthy();
  });
});
