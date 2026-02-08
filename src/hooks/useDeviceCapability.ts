import { useMemo } from 'react';

export type DeviceCapability = 'high' | 'medium' | 'low';

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function getCapabilityLevel(): DeviceCapability {
  // Respect prefers-reduced-motion
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return 'low';
  }

  if (!checkWebGLSupport()) {
    return 'low';
  }

  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as { deviceMemory?: number }).deviceMemory || 4;

  if (cores >= 8 && memory >= 8) return 'high';
  if (cores >= 4 && memory >= 4) return 'medium';
  return 'low';
}

export function useDeviceCapability(): DeviceCapability {
  return useMemo(() => getCapabilityLevel(), []);
}
