interface BaseTaskbar {
    name: string;
    key: string;
    icon: string;
    sort: number;
}

export interface TaskbarApp extends BaseTaskbar {}

export interface TaskbarButton extends BaseTaskbar {}
