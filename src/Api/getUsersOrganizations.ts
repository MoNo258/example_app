export async function getUsersOrganizations(login: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${login}/orgs`, {
      method: "GET",
      headers: {
        Accept: `application/json;odata=nometadata;`
      }
    });
    if (response.status === 200) {
      return (await response.json()) as IUsersOrgs[];
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
