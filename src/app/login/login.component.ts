import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    this.loading = true;
    const { email, password, firstName, lastName } = form.value;

    try {
      const resp = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      await resp.user.updateProfile({ displayName: `${firstName} ${lastName}` });
      form.reset();
      const uid = resp.user.uid;
      this.router.navigate([`/profile/${uid}`]);
    } catch (error) {
      console.log(error.message);
    }
    this.loading = false;
  }

}
