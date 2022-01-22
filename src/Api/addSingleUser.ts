export async function addSingleUser(
  avatar: UserModel["avatar_url"],
  description: UserModel["organizations_url"],
  name: UserModel["login"],
  typeId: UserType
) {
  let postData = {
    avatar_url: avatar,
    description: description,
    full_name: name,
    type: typeId
  };
  try {
    const response = await fetch(`api to add user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    if (response.status === 200) {
      return (await response.json()) as {
        avatar_url: UserModel["avatar_url"];
        description: UserModel["organizations_url"];
        full_name: UserModel["login"];
        type: UserType;
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
