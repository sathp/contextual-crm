// Define functions for getting all users, user registration, and login

const users = []

export default {
    getUsers: () => users,
    addUser: (user) => users.push(user),
};