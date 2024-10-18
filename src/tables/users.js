import Dexie from "dexie";
const db = new Dexie("PowerManagementSystem");
db.version(1).stores({
  users: "++id, name, phone, amps",
});
export const addUser = async (user) => {
  return await db.users.add(user);
};

export const getUsers = async (offset = 0, limit = 30) => {
  return await db.users.offset(offset).limit(limit).toArray();
};

export const updateUser = async (id, updatedUser) => {
  return await db.users.update(id, updatedUser);
};

export const deleteUser = async (id) => {
  return await db.users.delete(id);
};
export const fetchUsersWithPagination = async (
  page = 1,
  itemsPerPage = 10,
  searchQuery = ""
) => {
  const offset = (page - 1) * itemsPerPage;
  return await db.users
    .orderBy("id") // Order by 'id'
    .reverse() // Reverse the order to get descending order

    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery) ||
        user.amps.toString().includes(searchQuery)
    )

    .offset(offset)
    .limit(itemsPerPage)
    .toArray();
};
