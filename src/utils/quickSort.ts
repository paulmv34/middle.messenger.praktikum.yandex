function partition(arr: Array<number | string>, start: number = 0, end: number = arr.length - 1) {
    const pivotValue = arr[end];

    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        if (arr[i] <= pivotValue) {
            swap(arr, i, pivotIndex);
            pivotIndex++;
        }
    }

    swap(arr, pivotIndex, end);

    return pivotIndex;
}

function swap(arr: Array<number | string>, i: number, j: number) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

export function quickSort(arr: Array<number | string>, start: number = 0, end: number = arr.length - 1) {
    if (end <= start)
        return arr;

    const pivotIndex = partition(arr, start, end);

    quickSort(arr, start, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, end);

    return arr;
}
