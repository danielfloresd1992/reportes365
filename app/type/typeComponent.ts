

/////  MODAL

export type ModalAlert = {
    type: 'alert' | 'warning' | 'error' | 'sucessfull' | 'time' | null,
    open: boolean,
    callback: (() => void) | null,
    title: string | null,
    description: string | null
}