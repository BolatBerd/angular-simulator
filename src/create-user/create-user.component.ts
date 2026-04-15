import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

  @Input() onExistingUsers: IUser[] = [];
  @Output() onCreateUser = new EventEmitter<IUser>();

  private fb: FormBuilder = inject(FormBuilder)

  form = this.fb.nonNullable.group({
    id: [{value: null, disabled: true}],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.fb.nonNullable.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street:['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.nonNullable.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]]
      }),
    }),
    company: this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]]
    })
  })

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue() ;
    const user: IUser = {
      ...rawValue,
      id: Date.now()
    };

    this.onCreateUser.emit(user);
    this.form.reset();
  }

}
