import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, Form } from '@angular/forms';
import { MessageService } from '../classes/message.service';

@Component({
  selector: 'app-create-user',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {

  @Input() existingUsers: IUser[] = [];
  @Output() createUser = new EventEmitter<IUser>();

  form: FormGroup;
  private nextId: number = 1;
  private messageService: MessageService = inject(MessageService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [{value: null, disabled: true}],
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
      ],
      username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)]
      ],
      phone: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(25)]
      ],
      website: [
        '',
        [Validators.maxLength(100)]
      ],
      address: this.fb.group({
        city: [
          '',
          [Validators.required, Validators.maxLength(50)]
        ],
        street:[
          '',
          [Validators.required, Validators.maxLength(100)]
        ],
        suite: [
          '',
          [Validators.maxLength(50)]
        ],
        zipcode: [
          '',
          [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
        ],
        geo: this.fb.group({
          lat: [
            '',
            [Validators.required]
          ],
          lng: [
            '',
            [Validators.required]
          ]
        }),
      }),
      company: this.fb.group({
        name: [
          '',
          [Validators.required, Validators.maxLength(50)]
        ],
        catchPhrase: [
          '',
          [Validators.maxLength(200)]
        ],
        bs: [
          '',
          [Validators.maxLength(100)]
        ]
      })
    })
  }

  ngOnInit(): void {
    if (this.existingUsers && this.existingUsers.length > 0) {
      const maxId: number = Math.max(...this.existingUsers.map((u: IUser) => u.id));
      this.nextId = maxId + 1;
    }
  }

  onSubmit(): void {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    const id: number = this.nextId++;
    const user: IUser = {
      id,
      name: rawValue.name,
      username: rawValue.username,
      email: rawValue.email,
      phone: rawValue.phone,
      website: this.withUnknown(rawValue.website),

      address: {
        city: rawValue.address.city,
        street: rawValue.address.street,
        suite: this.withUnknown(rawValue.address.suite),
        zipcode: rawValue.address.zipcode,
        geo: {
          lat: rawValue.address.geo.lat,
          lng: rawValue.address.geo.lng
        },
      },

      company: {
        name: rawValue.company.name,
        catchPhrase: this.withUnknown(rawValue.company.catchPhrase),
        bs: this.withUnknown(rawValue.company.bs)
      }
    };

    this.createUser.emit(user);
    this.messageService.showSuccess('Пользователь создан успешно');
    this.form.reset();
  }

  private withUnknown(value: string | null | undefined): string {
    return value && value.trim().length > 0 ? value : 'Неизвестно';
  }

}
