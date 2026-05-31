import { ResolveFn } from '@angular/router';

export const postResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
