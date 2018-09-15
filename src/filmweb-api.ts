import * as Client from './filmweb-http-client'

export async function login(login: string, password: string): Promise<Client.Result> {
  const result = await Client.post(`login [${login}, ${password}, 1]`);
  return result;
}

export async function getFilmInfoFull(id: number): Promise<Client.Result> {
  const result = await Client.get(`getFilmInfoFull [${id}]`);
  return result;
}

export async function getFilmUserRecommendation(id: number): Promise<number | undefined> {
  let result;
  try {
    result = await Client.get(`getFilmUserRecommendation [${id}]`);
    return JSON.parse(result.content)[0];
  } catch (error) {
    console.error(`get(getFilmUserRecommendation [${id}])`, error, result);
    return undefined;
  }
}

export async function search(query:string): Promise<number | undefined> {
  let results;
  try {
    results = await Client.search(query);
    return Number(results[0][1]);   
  } catch (error) {
    console.error(`search(${query})`, error, results);
    return undefined;
  }
}
