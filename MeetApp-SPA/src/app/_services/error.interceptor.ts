import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
 intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>{
    return next.handle(req).pipe( 
            catchError( error => {
        if(error instanceof HttpErrorResponse){
            if(error.status === 401){
                return throwError(error.statusText);
            }
            const appError = error.headers.get('Application-Error');
            if (appError){
                console.log(JSON.stringify(appError));
                return throwError(appError);
            }
            const serverError = error.error;
            let modalStateErrors = '';
            if (serverError && typeof serverError === 'object'){
                for(const key in serverError){
                    if(serverError[key]){
                        modalStateErrors += serverError[key] + '\n';
                    }
                }
            }
            return throwError(modalStateErrors || serverError || 'Server Error');
        }
        return throwError('abc');
    })
    );
 }
}

export const ErrorInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
