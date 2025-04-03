export interface DropdownModel {
    text: string; // required
    enum?: string; // required
    onClick: () => void; // required
    class?: string // make it optional
    color?: string // make it optional
} 