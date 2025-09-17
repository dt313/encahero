import { storage } from '@/utils';

export default async function getNameOfUser() {
    const user = await storage.getUser();
    let name = user?.username;
    if (user && user.firstName && user.lastName) {
        name = user.firstName + user.lastName;
    }
    return name;
}
