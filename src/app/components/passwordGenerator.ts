export type PasswordConfig = {
  passwordLength?: number
  useLetters: boolean
  useNumbers: boolean
  useSymbols: boolean
}

export const InitialPasswordConfig: PasswordConfig = {
  useLetters: false,
  useNumbers: false,
  useSymbols: false,
}

const NUMBERS = Array.from('0123456789')
const LETTERS = Array.from(
  'abcdefghijklmnopqrstuvwzxyzABCDEFGHIJKLMNOPQRSTUVWZXYZ',
)
const SYMBOLS = Array.from('~!@#$%^&*()_+{}|:"<>?`[]\\,./')

export class PasswordGenerator {
  constructor(private config: PasswordConfig) {}

  generate(): string {
    const password = []

    let passwordLength = this.config.passwordLength ?? 10;
    let characters: string[] = []
    if (this.config.useLetters) {
      password.push(LETTERS[this.getRandomInt(LETTERS.length)])
      passwordLength -= 1
      characters = [...characters, ...LETTERS]
    }
    if (this.config.useNumbers) {
      password.push(NUMBERS[this.getRandomInt(NUMBERS.length)])
      passwordLength -= 1
      characters = [...characters, ...NUMBERS]
    }
    if (this.config.useSymbols) {
      password.push(SYMBOLS[this.getRandomInt(SYMBOLS.length)])
      passwordLength -= 1
      characters = [...characters, ...SYMBOLS]
    }

    while (passwordLength >= 0) {
      password.push(characters[this.getRandomInt(characters.length)])
      passwordLength -= 1
    }

    return password.sort(() => Math.random() - 0.5).join('')
  }

  private getRandomInt(upto: number) {
    return Math.floor(Math.random() * (upto + 1))
  }
}
