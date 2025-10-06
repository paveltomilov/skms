import { MarkerName } from '../types/markers';

export interface Connection {
    marker: MarkerName,
    point: string
};

export const actuatorsConnectionsLeft: Connection[] =
    [
        {
            marker: 'A1',
            point: 'p.p.1.3.1'
        },
        {
            marker: 'B1',
            point: 'p.p.2.3.1'
        },
        {
            marker: 'C1',
            point: 'p.p.3.3.1'
        },
        {
            marker: 'A2',
            point: 'unknown'
        },
        {
            marker: 'A13',
            point: 'unknown'
        },
        {
            marker: 'A21',
            point: 'p.p.1.4.1.1'
        },
        {
            marker: 'B21',
            point: 'p.p.2.4.1'
        },
        {
            marker: 'C21',
            point: 'p.p.3.4.1.1'
        },
        {
            marker: 'A13',
            point: 'unknown'
        },
        {
            marker: 'N',
            point: 'unknown'
        }
    ];


export const actuatorsConnectionsRight: Connection[] =
    [
        {
            marker: 'L1',
            point: 'p.p.1.3.2'
        },
        {
            marker: 'L2',
            point: 'p.p.2.3.2'
        },
        {
            marker: 'L3',
            point: 'p.p.3.3.2'
        },
        {
            marker: 'A4',
            point: 'unknown'
        },
        {
            marker: 'A21',
            point: 'unknown'
        },
        {
            marker: 'A21',
            point: 'p.p.1.4.2.1'
        },
        {
            marker: 'B21',
            point: 'p.p.2.4.2'
        },
        {
            marker: 'C21',
            point: 'p.p.3.4.2.1'
        },
        {
            marker: 'A21',
            point: 'unknown'
        },
        {
            marker: 'N',
            point: 'unknown'
        }
    ];

