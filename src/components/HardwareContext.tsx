import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TelemetryData {
  hr: number;
  hrv: number;
  stress: number;
  stability: number;
}

interface HardwareContextType {
  isConnected: boolean;
  isConnecting: boolean;
  batteryLevel: number;
  telemetry: TelemetryData | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
}

const HardwareContext = createContext<HardwareContextType | undefined>(undefined);

export const HardwareProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(84);
  const [error, setError] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  // Simulation of real-time telemetry stream
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setTelemetry({
          hr: 68 + Math.floor(Math.random() * 8),
          hrv: 45 + Math.floor(Math.random() * 15),
          stress: 12 + Math.floor(Math.random() * 5),
          stability: 98 + (Math.random() * 1.5)
        });
        setBatteryLevel(prev => Math.max(0, prev - 0.01));
      }, 1500);
    } else {
      setTelemetry(null);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    
    // Simulate tactical handshake
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // 10% chance of failure to make it feel "real"
    if (Math.random() < 0.1) {
      setError("NO EARPIECE DETECTED IN PROXIMITY");
      setIsConnecting(false);
      return;
    }

    setIsConnected(true);
    setIsConnecting(false);
  };

  const disconnect = () => {
    setIsConnected(false);
    setTelemetry(null);
  };

  return (
    <HardwareContext.Provider value={{ 
      isConnected, 
      isConnecting, 
      batteryLevel: Math.floor(batteryLevel), 
      telemetry, 
      connect, 
      disconnect,
      error 
    }}>
      {children}
    </HardwareContext.Provider>
  );
};

export const useHardware = () => {
  const context = useContext(HardwareContext);
  if (context === undefined) {
    throw new Error('useHardware must be used within a HardwareProvider');
  }
  return context;
};
