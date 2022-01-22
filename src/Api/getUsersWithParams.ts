export async function getUsersWithParams(
  first: string | number,
  skip: string | number
) {
  try {
    const response = await fetch(
      `http://localhost:4000/heroes?first=${first}&skip=${skip}`,
      {
        method: "GET",
        headers: {
          Accept: `application/json;odata=nometadata;`
        }
      }
    );
    if (response.status === 200) {
      return (await response.json()) as {
        data: UsersArrayModel["usersArray"];
        total_count: number;
      };
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
