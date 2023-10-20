const BASE_URL = 'http://localhost:8081/match'

export interface PAIR {
  username1: string,
  username2: string,
  complexity: string,
/*   question: string */
}

export interface MATCH {
  username: string,
  complexity: string
}

async function fetchData(api: string, requestOptions = {}): Promise<any> {
  const response = await fetch(api, requestOptions)
  const results = await response.json()
  if (!response.ok) {
    throw new Error(results.error)
  }
  return results.res
}

export async function startMatch(match: MATCH): Promise<PAIR> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(match)
  };
  const api = `${BASE_URL}`
  return fetchData(api, requestOptions)
}

export async function deleteMatch(username: string): Promise<void> {
  const requestOptions = {
    method: "DELETE",
  };
  const api = `${BASE_URL}/deleteMatch/${username}`
  return fetchData(api, requestOptions)
}

export async function deletePair(username: string): Promise<void> {
  const requestOptions = {
    method: "DELETE",
  };
  const api = `${BASE_URL}/deletePair/${username}`
  return fetchData(api, requestOptions)
}


export async function fetchAllInMatching(): Promise<MATCH[]>  {
  return fetchData(`${BASE_URL}/matching}`)
}

export async function fetchPair(username: string): Promise<PAIR> {
  const fetchPairApi = `${BASE_URL}/getPair/${username}`
  return fetchData(fetchPairApi)
}

  export async function fetchAllPairs(): Promise<MATCH[]>  {
    return fetchData(`${BASE_URL}/pair}`)
  }

  