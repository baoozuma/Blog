class Program {
    static void Main() {
        Matrix A = new Matrix(new double[,] {
            { 1, 20.5, 300 },
            { 4000, 5.12345, -6 }
        });
        Matrix B = new Matrix(new double[,] {
            { 1, 20.5, 300 },
            { 4000, 5.12345, -6 }
        });
        Matrix C = new Matrix (new double[,]
        {
            {1,2},
            {3,4}
        });
        Console.WriteLine(A + B);
        Console.WriteLine(C.Determinant());
    }
}