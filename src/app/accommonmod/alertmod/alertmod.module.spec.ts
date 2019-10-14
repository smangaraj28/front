import { AlertmodModule } from './alertmod.module';

describe('AlertmodModule', () => {
  let alertmodModule: AlertmodModule;

  beforeEach(() => {
    alertmodModule = new AlertmodModule();
  });

  it('should create an instance', () => {
    expect(alertmodModule).toBeTruthy();
  });
});
