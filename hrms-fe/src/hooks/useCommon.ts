import { useState, useEffect } from "react";
import { useAppSelector } from "../store";

export default function useCommon() {
  const [isMobile, setIsMobile] = useState(false);
  const user  = useAppSelector((state) => state.user);
  const isCompany = user.user?.role === "Company";

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return {
    isMobile,
    isCompany,
};
}