import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

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
  retry: () => Promise<void>;
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
        setBatteryLevel(prev => {
          const newLevel = Math.max(0, prev - 0.01);
          if (Math.floor(newLevel) === 15 && Math.floor(prev) === 16) {
            toast.warning("Low battery detected on Vaga-X1 unit.");
          }
          return newLevel;
        });

        // random disconnect simulation (very rare)
        if (Math.random() < 0.001) {
          disconnect();
          toast.error("Vaga-X1 connection lost. Signal interference detected.");
        }
      }, 1500);
    } else {
      setTelemetry(null);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const connect = async () => {
    if (isConnected) return;
    
    setIsConnecting(true);
    setError(null);
    
    const toastId = toast.loading("Initiating hardware handshake...");
    
    try {
      // Simulate tactical handshake
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 15% chance of failure to make it feel "real"
          if (Math.random() < 0.15) {
            reject(new Error("EARPIECE_NOT_FOUND"));
          } else {
            resolve(true);
          }
        }, 2000);
      });

      setIsConnected(true);
      toast.success("Vaga-X1 Link Established", { id: toastId });
    } catch (err: any) {
      const msg = "NO EARPIECE DETECTED IN PROXIMITY";
      setError(msg);
      toast.error(msg, { 
        id: toastId,
        description: "Ensure device is powered on and within 5 meters." 
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const retry = async () => {
    await connect();
  };

  const disconnect = () => {
    setIsConnected(false);
    setTelemetry(null);
    toast.message("Hardware session terminated.");
  };

  return (
    <HardwareContext.Provider value={{ 
      isConnected, 
      isConnecting, 
      batteryLevel: Math.floor(batteryLevel), 
      telemetry, 
      connect, 
      disconnect,
      retry,
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
