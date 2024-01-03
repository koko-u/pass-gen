import { ApplicationConfig } from '@angular/core'
import { provideNgIconsConfig } from '@ng-icons/core'

export const appConfig: ApplicationConfig = {
  providers: [provideNgIconsConfig({ size: '1.5rem' })],
}
