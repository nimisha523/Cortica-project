import { CanActivateFn } from '@angular/router';

export const adminGaurdGuard: CanActivateFn = (route, state) => {
  return true;
};
