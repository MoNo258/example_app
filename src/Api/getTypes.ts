export async function getTypes() {
  try {
    const response = await fetch(`http://localhost:4000/types`, {
      method: "GET",
      headers: {
        Accept: `application/json;odata=nometadata;`
      }
    });
    if (response.status === 200) {
      return (await response.json()) as HeroType[];
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
