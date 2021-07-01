export async function addSingleHero(
  avatar: HeroModel["avatar_url"],
  description: HeroModel["description"],
  name: HeroModel["full_name"],
  typeId: HeroType["id"]
) {
  let postData = {
    avatar_url: avatar,
    description: description,
    full_name: name,
    type: typeId
  };
  try {
    const response = await fetch(`http://localhost:4000/heroes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
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
