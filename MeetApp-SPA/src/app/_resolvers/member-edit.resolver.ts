import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, catchError, of } from "rxjs";
import { AuthService } from "../_services/auth.service";

@Injectable()

export class MemberEditResolver {

    constructor(private userService: UserService, private router: Router, 
        private alertify: AlertifyService, private authService : AuthService) { }

    resolve(route: ActivatedRouteSnapshot ): Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError( error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/members']);
                return of();
            })
        )
    }

    



}