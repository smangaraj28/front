import { AcnologinModule } from './acnologin.module';

describe('AcnologinModule', () => {
  let acnologinModule: AcnologinModule;

  beforeEach(() => {
    acnologinModule = new AcnologinModule();
  });

  it('should create an instance', () => {
    expect(acnologinModule).toBeTruthy();
  });
});
