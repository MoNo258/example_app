export async function addSingleHero() {
  try {
    const response = await fetch(`http://localhost:4000/heroes`, {
      method: "POST",
      headers: {
        Accept: `application/json;odata=nometadata;`
      }
    });
    if (response.status === 200) {
      return (await response.json()) as {
        avatar_url: HeroModel["avatar_url"];
        description: HeroModel["description"];
        full_name: HeroModel["full_name"];
        type: HeroType["id"];
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
