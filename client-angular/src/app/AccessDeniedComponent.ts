import { Component } from "@angular/core";

@Component({
  selector: "app-access-denied",
  template: `
    <div style="text-align:center; padding:3rem">
      <h1 style="color:red; font-size:2.5rem;">⛔ אין לך הרשאה לגשת למערכת</h1>
      <p>גישה מותרת למשתמשים עם תפקיד <strong>admin</strong> בלבד.</p>
    </div>
  `,
  standalone: true
})
export class AccessDeniedComponent {}
