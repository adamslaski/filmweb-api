import * as FilmwebAPI from '../src/filmweb-api'
import { credentials } from './credentials';

describe('Filmweb API', () => {
  it('logs in and fetch recommendation value', async () => {
    expect.assertions(2);
    const result = await FilmwebAPI.login(credentials.login, credentials.password);
    expect(result.status).toContain('ok');
    const result2 = await FilmwebAPI.getFilmUserRecommendation(770836);
    expect(result2.content).toContain('69');        
  })
  it('fetches full film info', async () => {
    expect.assertions(1);
    const result2 = await FilmwebAPI.getFilmInfoFull(770836);
    expect(result2.content).toContain('Thriller');
  })
})
