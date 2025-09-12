import store from "@/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
