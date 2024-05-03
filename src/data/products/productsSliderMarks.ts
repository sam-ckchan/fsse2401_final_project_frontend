interface Mark {
    value: number,
    label?: string
}

const marks: Mark[] = [
    {
        value: 12000,
    },
    {
        value: 14000,
    },
    {
        value: 20000,
    },
    {
        value: 28000,
    },
    {
        value: 36000,
    },
];

const maxMark = marks.reduce((max, mark) => mark.value > max.value ? mark : max, marks[0])
maxMark.label = "$" + maxMark.value
const maxStep = maxMark.value
const minMark = marks.reduce((min, mark) => mark.value < min.value ? mark : min, marks[0])
minMark.label = "$" + minMark.value
const minStep = minMark.value

export {marks, maxStep, minStep}