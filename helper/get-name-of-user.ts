export default function getNameOfUser(user: any) {
    let name = user?.username;
    if (user && user.firstName && user.lastName) {
        name = user.firstName + ' ' + user.lastName;
    }
    return name || 'No Name';
}
