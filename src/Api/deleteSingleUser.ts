export async function deleteSingleUser(id: string) {
  try {
    const response = await fetch(`api to delete user/${id}`, {
      method: "DELETE",
      headers: {
        Accept: `application/json;odata=nometadata;`
      }
    });
    if (response.status === 200) {
      return (await response.json()) as {
        avatar_url: UserModel["avatar_url"];
        description: UserModel["organizations_url"];
        full_name: UserModel["login"];
        id: UserModel["id"];
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
