import { AccoreModule } from './accore.module';

describe('AccoreModule', () => {
  let accoreModule: AccoreModule;

  beforeEach(() => {
    accoreModule = new AccoreModule();
  });

  it('should create an instance', () => {
    expect(accoreModule).toBeTruthy();
  });
});
