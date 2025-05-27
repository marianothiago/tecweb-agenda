import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const accessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(AuthService);
  if (service.isLoggedIn()) {
  return true;
  }
  router.navigate(['/login']);
  return false;
 };
