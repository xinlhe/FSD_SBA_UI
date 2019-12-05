import { FsdwinModule } from './fsdwin.module';

describe('FsdwinModule', () => {
  let fsdwinModule: FsdwinModule;

  beforeEach(() => {
    fsdwinModule = new FsdwinModule();
  });

  it('should create an instance', () => {
    expect(fsdwinModule).toBeTruthy();
  });
});
