export class HeroComponent {

  form = {
    location: '',
    date: '',
    persons: ''
  };

  get isFormsValid(): boolean {
    return !!(this.form.location && this.form.date && this.form.persons);
    // return this.form.location !== '' && this.form.date !== '' && this.form.persons !== '';
  }
}
