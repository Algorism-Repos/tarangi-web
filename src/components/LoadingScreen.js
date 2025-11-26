import React, { useEffect } from "react";
import logo from "../assets/Tarangi-Logo2.png";

export default function LoadingScreen() {

  // 🟢 Disable scroll when loading screen is active
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-[9999]">
      <img
        src={logo}
        alt="loading"
        className="w-28 h-28 object-contain animate-spin"
        style={{ animationDuration: "2s" }}
      />
    </div>
  );
}
