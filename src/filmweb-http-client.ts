import { Md5 } from "ts-md5";
import { default as axios, AxiosResponse } from 'axios';

namespace Config {
  export const API_SERVER = 'https://ssl.filmweb.pl/api?'; // 'http://localhost:5000/';
  export const KEY = 'qjcGhW2JnvGT9dfCt3uT_jozR3s';
}

const VERSION = "1.0";
const APPID = "android";

  /**
   * Przygotowanie sygnatury
   * @param method Dane metody zdalnej postaci: nazwa_metody [parametry]
   * @return Sygnatura hex:string
   */
function prepareSignature(method: string):string {
  let signature = method + "\\n" + APPID + Config.KEY;
  signature = VERSION + "," + Md5.hashStr(signature);
  return signature;
}

/**
 * Przygotowanie parametrów dla zapytania
 * @param method Dane metody zdalnej postaci: nazwa_metody [parametry]
 * @return Parametry dla URL
 */
function prepareParams(method:string): string {
  let signature = prepareSignature(method);
  method += "\\n";

  let qs = "methods=" + encodeURI(method)
        + "&signature=" + encodeURI(signature)
        + "&version=" + encodeURI(VERSION)
        + "&appId=" + encodeURI(APPID);
    return qs;
}

export interface Result {
  origResponse: AxiosResponse<string>,
  status: string,
  content: string,
  t: number | undefined
}

function extractResult(response: AxiosResponse<string>): Result {
  if (response.data.startsWith('err')) {
    throw new Error(response.data);
  }
  let firstEOL = response.data.indexOf('\n');
  let lastTColon = response.data.lastIndexOf('t:');
  let content = response.data.slice(firstEOL, lastTColon > 0 ? lastTColon : undefined);
  return {
    origResponse: response,
    status: response.data.substring(0, firstEOL).trim(),
    content: content.trim(),
    t: lastTColon > 0 ? Number(response.data.substring(lastTColon+2).trim()) : undefined
  };
}

export async function get(method:string): Promise<Result> {
  let result = await axios.get(Config.API_SERVER + prepareParams(method));
  console.log(result.data);
  return extractResult(result);
}

export async function post(method:string): Promise<Result> {
  let result = await axios.post(Config.API_SERVER + prepareParams(method));
  console.log(result.data);
  return extractResult(result);
}
