"use client";

import { useState, useEffect } from "react";

interface SplineWrapperProps {
  scene: string;
  className?: string;
}

export function SplineWrapper({ scene, className = "" }: SplineWrapperProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [SplineComponent, setSplineComponent] = useState<any>(null);

  useEffect(() => {
    // Dynamically import Spline only on client side
    const loadSpline = async () => {
      try {
        const { default: Spline } = await import("@splinetool/react-spline");
        setSplineComponent(() => Spline);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading Spline:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Set a timeout to show fallback if Spline takes too long
    const timer = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 3000);

    loadSpline();

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError || !SplineComponent) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-primary-100 via-primary-200 to-purple-200 ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🚀</span>
            </div>
            <p className="text-primary-700 font-medium">Experiencia 3D disponible</p>
            <p className="text-primary-600 text-sm mt-2">Cargando modelo interactivo...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 animate-pulse flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-primary-500 rounded-full animate-bounce"></div>
            <p className="text-primary-700 text-sm">Cargando 3D...</p>
          </div>
        </div>
      )}
      <SplineComponent
        scene={scene}
        onLoad={handleLoad}
        onError={handleError}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
