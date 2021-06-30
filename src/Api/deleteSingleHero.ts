export async function deleteSingleHero(id: string) {
  try {
    const response = await fetch(`http://localhost:4000/heroes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: `application/json;odata=nometadata;`
      }
    });
    if (response.status === 200) {
      return (await response.json()) as {
        avatar_url: HeroModel["avatar_url"];
        description: HeroModel["description"];
        full_name: HeroModel["full_name"];
        id: HeroModel["id"];
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
