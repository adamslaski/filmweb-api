// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import * as Client from './filmweb-http-client'

export async function login(login: string, password: string): Promise<Client.Result> {
  const result = await Client.post(`login [${login}, ${password}, 1]`);
  return result;
}

export async function getFilmInfoFull(id: number): Promise<Client.Result> {
  const result = await Client.get(`getFilmInfoFull [${id}]`);
  return result;
}

export async function getFilmUserRecommendation(id: number): Promise<Client.Result> {
  const result = await Client.get(`getFilmUserRecommendation [${id}]`);
  return result;
}

export class Filmweb {

}
