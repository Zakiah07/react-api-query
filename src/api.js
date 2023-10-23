export async function fetchProfiles(page) {
  const res = await fetch(`https://reqres.in/api/users?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}
