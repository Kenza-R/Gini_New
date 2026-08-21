"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ColorfulLeadDialog } from "@/components/ColorfulLeadDialog";

type JoinModalContextValue = {
  openJoinModal: () => void;
  openFoundingModal: () => void;
};

const JoinModalContext = createContext<JoinModalContextValue | null>(null);

export function useJoinModal() {
  const context = useContext(JoinModalContext);
  if (!context) {
    throw new Error("useJoinModal must be used within JoinModalProvider");
  }
  return context;
}

const WAITLIST_DISMISSED = "gini.waitlist.dismissed";
const WAITLIST_DONE = "gini.waitlist.done";

export function JoinModalProvider({ children }: { children: ReactNode }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [foundingOpen, setFoundingOpen] = useState(false);

  const openJoinModal = useCallback(() => {
    setFoundingOpen(false);
    setWaitlistOpen(true);
  }, []);

  const openFoundingModal = useCallback(() => {
    setWaitlistOpen(false);
    setFoundingOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => {
    setWaitlistOpen(false);
    try {
      if (!window.localStorage.getItem(WAITLIST_DONE)) {
        window.localStorage.setItem(WAITLIST_DISMISSED, "1");
      }
    } catch {
      // ignore
    }
  }, []);

  const closeFounding = useCallback(() => {
    setFoundingOpen(false);
  }, []);

  useEffect(() => {
    try {
      if (
        window.localStorage.getItem(WAITLIST_DONE) ||
        window.localStorage.getItem(WAITLIST_DISMISSED)
      ) {
        return;
      }
    } catch {
      return;
    }

    const timeout = window.setTimeout(() => {
      setWaitlistOpen(true);
    }, 1100);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <JoinModalContext.Provider value={{ openJoinModal, openFoundingModal }}>
      {children}
      <ColorfulLeadDialog
        open={waitlistOpen}
        onClose={closeWaitlist}
        list="waitlist"
      />
      <ColorfulLeadDialog
        open={foundingOpen}
        onClose={closeFounding}
        list="founding"
      />
    </JoinModalContext.Provider>
  );
}
