import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, catchError, of } from "rxjs";

@Injectable()

export class MemberListResolver {

    constructor(private userService: UserService, private router: Router,
        private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | Observable<User[]> | Promise<User[]> {
        return this.userService.getUsers().pipe(
            catchError( error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of();
            })
        )
    }

    
    
}