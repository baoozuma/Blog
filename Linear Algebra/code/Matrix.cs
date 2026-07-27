using System;

using System.Text;
public class Matrix {
    private readonly double[,] data;
    public int Rows {get;}
    public int Cols {get;}
    //Empty Matrix
    public Matrix (int rows, int cols) { 
        if (rows <= 0 || cols <= 0) {
            throw new ArgumentException("Matrix size must be positive.");
        }
        Rows = rows;
        Cols = cols;
        data = new double[rows, cols];
    }
    //Inputed Matrix
    public Matrix (double[,] inputMatrix) {
        if (inputMatrix == null) {
            throw new ArgumentNullException(nameof(inputMatrix));
        }
        Rows = inputMatrix.GetLength(0);
        Cols = inputMatrix.GetLength(1);
    
        data = new double[Rows, Cols];

        for (int i = 0; i < Rows; i++) {
            for (int j = 0; j < Cols; j ++) {
                data[i,j] = inputMatrix[i,j];
            }              
        }
    }
    public double this[int i, int j] {
        get {
            CheckIndex(i,j);
            return data[i,j];
        }
        set {
            CheckIndex(i,j);
            data[i,j] = value;
        }
    }
    public void CheckIndex(int i, int j) {
        if (i < 0 || i >= Rows || j < 0 || j >= Cols) {
            throw new IndexOutOfRangeException("Invalid matrix index.");
        }
    }
    public void CheckSameSize(Matrix other){
        if (Rows != other.Rows || Cols != other.Cols) {
            throw new ArgumentException("Matrices must have the same sizes.");
        }
    }
    private void CheckCanMultiply(Matrix other) {
        if (Cols != other.Rows) {
            throw new ArgumentException("Invalid matrix multiplication size.");
        }
    }

    private void CheckSquare() {
        if (Rows != Cols) {
            throw new InvalidOperationException("Matrix must be square.");
        }   
    }
    public static Matrix operator +(Matrix A, Matrix B) {
        ArgumentNullException.ThrowIfNull(A);
        ArgumentNullException.ThrowIfNull(B);
        A.CheckSameSize(B);
        Matrix result = new Matrix(A.Rows, A.Cols);
        for(int i = 0; i < A.Rows; i++) {
            for(int j = 0; j < A.Cols; j++) {
                result[i,j] = A[i,j] + B[i,j];
            }
        }
        return result;
    }
    public static Matrix operator -(Matrix A, Matrix B) {
        ArgumentNullException.ThrowIfNull(A);
        ArgumentNullException.ThrowIfNull(B);
        A.CheckSameSize(B);
        Matrix result = new Matrix(A.Rows, A.Cols);
        for(int i = 0; i < A.Rows; i++) {
            for(int j = 0; j < A.Cols; j++) {
                result[i,j] = A[i,j] - B[i,j];
            }
        }
        return result;
    }
    public static Matrix operator *(Matrix A, Matrix B) {
        ArgumentNullException.ThrowIfNull(A);
        ArgumentNullException.ThrowIfNull(B);
        A.CheckCanMultiply(B);
        Matrix result = new Matrix(A.Rows, B.Cols);
        for (int i = 0; i < A.Rows; i++) {
            for (int j = 0; j < B.Cols; j++){
                double sum = 0;

                for(int k = 0; k < A.Cols; k++ ){
                    sum += A[i,k]*B[k,j];
                }

                result[i,j] = sum;
            }
        }
        return result;
    }
    public static Matrix operator *(double scalar, Matrix A){ 
        ArgumentNullException.ThrowIfNull(A);
        Matrix result = new Matrix(A.Rows, A.Cols);
        for (int i = 0; i < A.Rows; i++) {
            for (int j = 0; j < A.Cols; j++) {
                result[i,j] = scalar*A[i,j];
            }
        }
        return result;
    }
    public static Matrix operator *(Matrix A, double scalar) {
        return scalar * A;
    }
    public double Determinant() {
        CheckSquare();

        double[,] a = CopyData();

        int sign;
        bool ok = MatrixAlgorithms.GaussianEliminate(a, out sign);

        if (!ok) {
            return 0;
        }

        double det = sign;

        for (int i = 0; i < Rows; i++) {
            det *= a[i, i];
        }

        return det;
    }

    private double[,] CopyData() {
        double[,] copy = new double[Rows, Cols];

        for (int i = 0; i < Rows; i++) {
            for (int j = 0; j < Cols; j++) {
                copy[i, j] = data[i, j];
            }
        }

        return copy;
    }

    public override string ToString() {
        string[,] text = new string[Rows, Cols];
        int[] width = new int[Cols];

        for (int i = 0; i < Rows; i++) {
            for (int j = 0; j < Cols; j++) {
                text[i, j] = data[i, j].ToString("0.###");
                width[j] = Math.Max(width[j], text[i, j].Length);
            }
        }

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < Rows; i++) {
            sb.Append("[ ");

            for (int j = 0; j < Cols; j++) {
                sb.Append(text[i, j].PadLeft(width[j]));
                sb.Append(" ");
            }

            sb.AppendLine("]");
        }

        return sb.ToString();
    }

}
