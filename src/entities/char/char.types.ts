export interface CharGetRequest {
  id: string
}

export interface CharGetResponse {
  gender: 'Male' | 'Female'
  hair_color: 'Blond'
  height: '172'
  homeworld: 'https://swapi.dev/api/planets/1/'
  mass: '77'
  name: 'Luke Skywalker'
  skin_color: 'Fair'
  eye_color: 'Blue'
  created: '2014-12-09T13:50:51.644000Z' | string
  edited: '2014-12-10T13:52:43.172000Z' | string
  url: 'https://swapi.dev/api/people/1/'
}
