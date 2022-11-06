function sieveOfEratosthenes(N,  s)
{
    prime = Array.from({length: N+1}, (_, i) => false);

    for (i = 2; i <= N; i += 2)
        s[i] = 2;
 
    for (i = 3; i <= N; i += 2)
    {
        if (prime[i] == false)
        {
            s[i] = i;

            for (j = i; j * i <= N; j += 2)
            {
                if (prime[i * j] == false)
                {
                    prime[i * j] = true;
                    s[i * j] = i;
                }
            }
        }
    }
}

function generatePrimeFactors(N)
{
    var s = Array.from({length: N+1}, (_, i) => 0);
 
    sieveOfEratosthenes(N, s);
 
 
    var curr = s[N];
    var cnt = 1;

    var array = [];
 
    while (N > 1)
    {
        N /= s[N];
 
        if (curr == s[N])
        {
            cnt++;
            continue;
        }
 
        array.push(Array(curr, cnt))

        curr = s[N];
        cnt = 1;
    }

    return array
}
 
// var N = 63;
// console.log(generatePrimeFactors(N));
