using System;

public static class MatrixAlgorithms {
    private const double Eps = 1e-10;

    public static bool GaussianEliminate(double[,] a, out int sign) {
        int n = a.GetLength(0);
        sign = 1;

        for (int col = 0; col < n; col++) {
            int pivot = col;

            for (int row = col + 1; row < n; row++) {
                if (Math.Abs(a[row, col]) > Math.Abs(a[pivot, col])) {
                    pivot = row;
                }
            }

            if (Math.Abs(a[pivot, col]) < Eps) {
                return false;
            }

            if (pivot != col) {
                SwapRows(a, pivot, col);
                sign *= -1;
            }

            for (int row = col + 1; row < n; row++) {
                double factor = a[row, col] / a[col, col];

                for (int j = col; j < n; j++) {
                    a[row, j] -= factor * a[col, j];
                }
            }
        }

        return true;
    }

    private static void SwapRows(double[,] a, int r1, int r2) {
        int cols = a.GetLength(1);

        for (int j = 0; j < cols; j++) {
            double temp = a[r1, j];
            a[r1, j] = a[r2, j];
            a[r2, j] = temp;
        }
    }
}