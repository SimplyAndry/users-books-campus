import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/store/useUserStore";

export function useHydratedAuth() {
  const user = useAuthStore((state) => state.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    return unsub;
  }, []);

  return { user, hydrated };
}