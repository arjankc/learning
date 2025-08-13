namespace Examples.Basics.Demos;

public static class DelegatesEventsDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== delegates & events ==");
        // delegates
        Func<int,int,int> add = (a,b) => a + b;
        Console.WriteLine(add(2,3));

        // multicast Action
        Action pipeline = () => Console.Write("A");
        pipeline += () => Console.Write("B");
        pipeline();
        Console.WriteLine();

        // event pattern
        var c = new Counter();
        c.ThresholdReached += (_, n) => Console.WriteLine($"Hit {n}");
        for (int i=0;i<5;i++) c.Increment();
    }

    private sealed class Counter
    {
        public event EventHandler<int>? ThresholdReached;
        private int _count;
        public void Increment()
        {
            _count++;
            if (_count % 5 == 0) ThresholdReached?.Invoke(this, _count);
        }
    }
}
