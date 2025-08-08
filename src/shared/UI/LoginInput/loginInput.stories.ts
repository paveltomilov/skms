import type { Meta, StoryObj } from '@storybook/react';
import {InputProps} from "@/shared/types/inputLogin";
import LoginInput from "@/shared/UI/LoginInput/index";

const meta: Meta<InputProps> = {
    title: 'Shared/UI/LoginInput',
    component: LoginInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'Текст метки (label) для поля ввода',
            control: 'text',
            defaultValue: 'Логин',
        },
        placeholder: {
            description: 'Текст-подсказка внутри поля ввода',
            control: 'text',
            defaultValue: 'Введите значение',
        },
        errorMessage: {
            description: 'Сообщение об ошибке, отображается при error=true',
            control: 'text',
        },
        warnMessage: {
            description: 'Сообщение с предупреждением, отображается при warn=true',
            control: 'text',
        },
        error: {
            description: 'Флаг ошибки, влияет на стилизацию и отображение errorMessage',
            control: 'boolean',
            defaultValue: false,
        },
        warn: {
            description: 'Флаг предупреждения, влияет на стилизацию и отображение warnMessage',
            control: 'boolean',
            defaultValue: false,
        },
        indicator: {
            description: 'Числовой индикатор состояния поля',
            control: { type: 'number', min: 0, max: 3, step: 1 },
            defaultValue: 0,
        },
        done: {
            description: 'Флаг успешного заполнения поля, влияет на стилизацию',
            control: 'boolean',
            defaultValue: false,
        },
        type: {
            description: 'Тип поля ввода (атрибут type для input)',
            control: 'text',
            defaultValue: 'text',
        },
        name: {
            description: 'Имя поля (атрибут name для input)',
            control: 'text',
        },
        id: {
            description: 'Id поля (атрибут id для input и htmlFor для label)',
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
    args: {
        label: 'Логин',
        placeholder: 'Введите логин',
        error: false,
        warn: false,
        errorMessage: '',
        warnMessage: '',
        indicator: 0,
        done: false,
        type: 'text',
        name: 'login',
        id: 'login',
    },
};

export const WithError: Story = {
    args: {
        ...Default.args,
        error: true,
        errorMessage: 'Неверный логин',
    },
};

export const WithWarning: Story = {
    args: {
        ...Default.args,
        warn: true,
        warnMessage: 'Логин должен быть не короче 3 символов',
    },
};

export const DoneState: Story = {
    args: {
        ...Default.args,
        done: true,
    },
};

export const WithIndicator: Story = {
    args: {
        ...Default.args,
        indicator: 2,
    },
};

export const PasswordInput: Story = {
    args: {
        label: 'Пароль',
        placeholder: 'Введите пароль',
        type: 'password',
        name: 'password',
        id: 'password',
    },
};
