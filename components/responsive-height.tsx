import React, { useState, useEffect } from "react";

interface ResponsiveHeightComponentProps {
  children: React.ReactNode;
}

const ResponsiveHeightComponent = ({
  children,
}: ResponsiveHeightComponentProps) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      setViewportHeight(currentHeight);

      // Compare current viewport height to the initial height to determine if the keyboard is visible
      setKeyboardVisible(currentHeight < window.innerHeight);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  const dynamicStyle = {
    height: `calc(${viewportHeight}px)`,
    paddingBottom: keyboardVisible ? "0" : "1rem",
    marginBottom: keyboardVisible ? "0" : "1rem",
  };

  return (
    <div className="border" style={dynamicStyle}>
      {children}
    </div>
  );
};

export default ResponsiveHeightComponent;
