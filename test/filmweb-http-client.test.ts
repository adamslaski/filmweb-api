import * as Client from '../src/filmweb-http-client'

/**
 * API calls
 */
describe('Low level http calls', () => {
  it('get description of "Sharp Objects"', async () => {
    expect.assertions(1);
    const descs = await Client.get('getFilmDescription [770836]');
    expect(descs.content).toContain('Sharp Objects')
  })

  it('get full info of "Sharp Objects"', async () => {
    expect.assertions(2);
    const descs = await Client.get('getFilmInfoFull [770836]');
    expect(descs.content).toContain('Sharp Objects')
    expect(descs.content).toContain('Thriller')
  })

  it('login to Filmweb fails with error message', async () => {
    expect.assertions(1);
    try {
      const descs = await Client.post('login [test, test, 1]');
    } catch (e) {
      expect((e as Error).message).toContain('badCreadentials');
    }
  })

  it('searches for sharp objects', async () => {
    expect.assertions(1);
    const results = await Client.search('sharp objects');
    expect(results[0][1]).toContain('770836');
  })

})
