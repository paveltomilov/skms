/**
 *
 * @param value 
 * @param unit 
 * @param precisionFactor
 * @returns 
 */
export const formatMeasurementValue = (
    value: number,
    unit: string | null = '',
    precisionFactor: number = 1
): string => {

    if (isNaN(value) || !isFinite(value)) {
        return 'Err'; 
    }

    const absValue = Math.abs(value);
    let prefix = '';
    let scaledValue = value;
    let precision = 2; 

    if (absValue >= 1_000_000) {
        prefix = 'M';
        scaledValue = value / 1_000_000;
        precision = Math.max(1, 3 - Math.floor(Math.log10(Math.abs(scaledValue)))); 
    } else if (absValue >= 1_000) {
        prefix = 'k';
        scaledValue = value / 1_000;
        precision = Math.max(1, 3 - Math.floor(Math.log10(Math.abs(scaledValue)))); 
    } else if (absValue < 1 && absValue >= 0.001) {
        prefix = 'm';
        scaledValue = value * 1_000;
        precision = Math.max(1, 2); 
    } else if (absValue < 0.001 && absValue > 0.000001) { 
         prefix = 'µ'; 
         scaledValue = value * 1_000_000;
         precision = Math.max(0, 1); 
    } else if (absValue <= 0.000001 && absValue !== 0) {
         scaledValue = 0;
         precision = 2 + Math.round(precisionFactor); 
    } else {
        precision = Math.max(1, 2 + Math.round(precisionFactor)); 
    }

    precision = Math.max(0, Math.min(4, precision));

    if (Math.abs(scaledValue - Math.round(scaledValue)) < (0.1 / Math.pow(10, precision))) {
         precision = 0;
    }

    const formattedNumber = scaledValue.toFixed(precision);

    return `${formattedNumber}${prefix ? ` ${prefix}` : ''}${unit ? `${unit}` : ''}`;
};
