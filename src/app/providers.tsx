// "use client";

// import { Provider } from "react-redux";
// import store from "../store/auth/store";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }

"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import store, { AppDispatch } from "../store/auth/store";
import { checkSession } from "../store/auth/authActions";

// Session check
function SessionChecker({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check session on mount
    dispatch(checkSession());
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionChecker>{children}</SessionChecker>
    </Provider>
  );
}
