import { Injectable } from "@angular/core";
import { MemberEditComponent } from "../members/member-edit/member-edit.component";
import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()

export class PreventUnsavedChanges {
  canDeactivate(
    component: MemberEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (component.editForm.dirty) {
    return confirm('Are you sure you want to leave? Unsaved changes will be lost!');
  }
  return true;
  }
}
