#include <cs50.h>
#include <math.h>
#include <stdio.h>

int getNumberCoins(float coins);

int main(void)
{
    float owed;

    do
    {
        owed = get_float("Change owed: ");
    }
    while (owed < 0);

    int numberOfCoins = getNumberCoins(owed);
    printf("%i \n", numberOfCoins);
}

int getNumberCoins(float owed)
{
    float rest = round(owed * 100);
    int count = 0;

    while (rest != 0)
    {
        if (rest > 25)
        {
            rest -= 25;
        }
        else if (rest > 10)
        {
            rest -= 10;
        }
        else if (rest > 5)
        {
            rest -= 5;
        }
        else
        {
            rest -= 1;
        }

        count += 1;
    }

    return count;
}
