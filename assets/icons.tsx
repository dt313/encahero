import { AntDesign, Feather } from '@expo/vector-icons';

export const icons = {
    index: (props: any) => <AntDesign name="home" size={26} {...props} />,
    explore: (props: any) => <Feather name="compass" size={26} {...props} />,
    create: (props: any) => <AntDesign name="pluscircleo" size={26} {...props} />,
    profile: (props: any) => <AntDesign name="user" size={26} {...props} />,
};
