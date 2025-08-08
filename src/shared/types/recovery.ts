import {ValidationLevel} from '@/shared/types/login';

export type ValidationStatusRecovery = Record<keyof RecoveryFormData, ValidationLevel>
export type RecoveryFormData = {
    email: string;
    password: string;
    confirm_password: string;
}