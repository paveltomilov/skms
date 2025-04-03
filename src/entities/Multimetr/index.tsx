import { 
  useState, 
  useRef, 
  useEffect, 
  useCallback 
} from 'react';
import styles from './styles.module.scss';

interface MarkerType {
  id: string;
  value: string;
}

const MARKERS: MarkerType[] = [
  'OFF', '750', '200', '200μ', '2000μ', 
  '20m', '200m', '10A', 'hFE', '>+',
  '200', '20k', '200k', '2000k', '200m',
  '2000m', '20', '200', '1000', '2000'
].map((marker, index) => ({ 
  id: `${marker}-${index}`, 
  value: marker 
}));

const Multimeter = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedMarker, setSelectedMarker] = useState('');
  const [isClient, setIsClient] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startAngle = useRef(0);
  const animationFrame = useRef<number>();

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const getMarkerPosition = useCallback((index: number) => {
    const angle = (index * 18) - 90;
    const radius = 100;
    return {
      x: radius * Math.cos(angle * Math.PI / 180),
      y: radius * Math.sin(angle * Math.PI / 180)
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    const rect = knobRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      startAngle.current = Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) * 180 / Math.PI;
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !knobRef.current) return;
    
    animationFrame.current = requestAnimationFrame(() => {
      const rect = knobRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) * 180 / Math.PI;
      
      const delta = angle - startAngle.current;
      let newRotation = rotation + delta;
      newRotation = ((newRotation % 360) + 360) % 360;
      
      setRotation(newRotation);
      startAngle.current = angle;

      const markerIndex = Math.round(newRotation / 18) % 20;
      setSelectedMarker(MARKERS[(20 - markerIndex) % 20].value);
    });
  }, [rotation]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className={styles.multimeter}>
      <div className={styles.multimeter__display}>
        <span className={styles.multimeter__display__value}>
          {selectedMarker === 'OFF' ? '' : '0.00'}
        </span>
        <span className={styles.multimeter__display__unit}>
          {selectedMarker}
        </span>
      </div>

      <div className={styles.multimeter__knob_wrapper}>
        {isClient && MARKERS.map(({ id, value }, index) => {
          const pos = getMarkerPosition(index);
          return (
            <div
              key={id}
              className={styles.multimeter__marker}
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {value}
            </div>
          );
        })}
        
        <div
          ref={knobRef}
          className={styles.multimeter__knob}
          style={{ transform: `rotate(${rotation}deg)` }}
          onMouseDown={handleMouseDown}
        >
          <div className={styles.multimeter__knob__handle} />
        </div>
      </div>
    </div>
  );
};

export default Multimeter;