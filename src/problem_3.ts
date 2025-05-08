function concatenateArrays<T>(...arrays: T[][]): T[] {
    return arrays.reduce((result, currentArray) => [...result, ...currentArray], [] as T[]);
}