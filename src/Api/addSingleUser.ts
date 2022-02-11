export async function addSingleUser(
  avatar: IUser["avatar_url"],
  description: IUser["organizations_url"],
  name: IUser["login"],
  typeId: UserType | null
) {
  let postData = {
    avatar_url: avatar,
    description: description,
    full_name: name,
    type: typeId,
  };
  try {
    const response = await fetch(`api to add user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (response.status === 200) {
      return (await response.json()) as {
        avatar_url: IUser["avatar_url"];
        description: IUser["organizations_url"];
        full_name: IUser["login"];
        type: UserType;
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
