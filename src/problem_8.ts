async function squareAsync(n: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        if (n < 0) {
            reject(new Error("Negative number not allowed"));
        } else {
            setTimeout(() => {
                resolve(n * n);
            }, 1000);
        }
    });
}