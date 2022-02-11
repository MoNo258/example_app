export async function getUsersWithParams(page: number) {
  try {
    const response = await fetch(`https://api.github.com/users?page=${page}`, {
      method: "GET",
      headers: {
        Accept: `application/json;odata=nometadata;`,
      },
    });
    if (response.status === 200) {
      return (await response.json()) as {
        data: IUsersSlice["usersArray"];
        total_count: number;
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
