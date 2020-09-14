export interface JWTDecoded {
  name: string
  sub: string
  exp: string
  picture: string
  email: string
}

export type Session = {
  token: string
} & JWTDecoded
