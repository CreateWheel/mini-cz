export interface Config {
  kinds: Kind[]
  scopes?: string[]
}

export interface Kind {
  name: string
  description?: string
  emoji?: string
}
