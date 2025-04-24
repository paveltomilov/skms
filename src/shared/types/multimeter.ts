export type MultimeterMode =
  | 'OFF' 
  | 'ACV_750' | 'ACV_200' 
  | 'DCA_200u' | 'DCA_2000u' | 'DCA_20m' | 'DCA_200m' | 'DCA_10A' 
  | 'HFE'      
  | 'DIODE'   
  | 'OHM_2000k' | 'OHM_200k' | 'OHM_20k' | 'OHM_2000' | 'OHM_200' 
  | 'DCV_1000' | 'DCV_200' | 'DCV_20' | 'DCV_2000m' | 'DCV_200m'; 

export type MeasurementType =
  | 'VOLTAGE_DC'    
  | 'VOLTAGE_AC'    
  | 'CURRENT_DC'   
  // | 'CURRENT_AC' 
  | 'RESISTANCE'   
  | 'CONTINUITY'    
  | 'DIODE_CHECK'  
  | 'TRANSISTOR_HFE' 
  | 'OFF';         

export interface ProbePosition {
  x: number;
  y: number;
}

export interface ProbeConnection {
  targetId: string | null;
  targetType: 'node' | null;
}

export interface ProbeConnectionsState {
  red: ProbeConnection;   
  black: ProbeConnection; 
}

export interface MultimeterState {
  currentMode: MultimeterMode; 
  displayValue: string;  
  measurementResult: number | null;
  measurementUnit: string | null;
  errorState: string | null;  
  probeConnections: ProbeConnectionsState; 
  probePositions: {
    red: ProbePosition | null;
    black: ProbePosition | null;
  };
}

export type MultimeterErrorType =
  | 'WRONG_MODE_FOR_MEASUREMENT' 
  | 'WRONG_JACKS_FOR_MODE'    
  | 'OVERLOAD'          
  | 'FUSE_BLOWN'      
  | 'SHORT_CIRCUIT_DETECTED'    
  | 'INVALID_CONNECTION'   
  | 'CALCULATION_ERROR';      

export type ModeAnglesMap = Record<MultimeterMode, number>;

export interface PointData {
  id: string; 
  label: string; 
  position: { top: number | string; left: number | string };
}