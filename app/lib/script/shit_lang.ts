export default function shiftToEs(shift: 'day' | 'night' | 'all') {
    if (shift === 'day') return 'diurno';
    else if (shift === 'night') return 'nocturno';
    else if (shift === 'all') return 'diario'
    else return shift;
}