export async function getHeroes() {
  try {
    const response = await fetch(`http://localhost:4000/heroes`, {
      method: "GET",
      headers: {
        Accept: `application/json;odata=nometadata;`
      }
    });
    if (response.status === 200) {
      return (await response.json()) as {
        data: HeroesArrayModel["heroesArray"];
        total_count: number;
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
