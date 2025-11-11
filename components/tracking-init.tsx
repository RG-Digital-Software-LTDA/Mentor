"use client";
import { useEffect } from 'react';
import { initializeTracking } from '@/lib/trackingUtils';

export function TrackingInit() {
  useEffect(() => {
    // Inicializa cookies assim que o componente carrega
    initializeTracking();
  }, []);

  return null; // Componente invisível
}