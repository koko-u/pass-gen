import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  signal,
} from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import {
  InitialPasswordConfig,
  PasswordConfig,
  PasswordGenerator,
} from './components/passwordGenerator'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { bootstrapBackspace } from '@ng-icons/bootstrap-icons'

@Component({
  standalone: true,
  imports: [FormsModule, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapBackspace })],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('form')
  passwordForm: NgForm | undefined

  readonly passwordConfig = signal<PasswordConfig>(InitialPasswordConfig)
  readonly password = signal('')

  readonly isDisabled = computed(() => {
    const length = this.passwordConfig().passwordLength
    if (!length || length === 0) return true
    if (
      !this.passwordConfig().useLetters &&
      !this.passwordConfig().useNumbers &&
      !this.passwordConfig().useSymbols
    ) {
      return true
    }
    return false
  })

  ngAfterViewInit(): void {
    this.passwordForm?.form.valueChanges.subscribe((value) =>
      this.passwordConfig.set(value),
    )
  }

  generatePassword() {
    const generator = new PasswordGenerator(this.passwordConfig())
    this.password.set(generator.generate())
  }
  clearPassword() {
    this.password.set('')
  }
}
