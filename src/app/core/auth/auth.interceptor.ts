import { HttpInterceptorFn } from '@angular/common/http';

export const commercetoolsAuthInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
