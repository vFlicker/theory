#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int height;

    do
    {
        height = get_int("Enter hight of pyramid: ");
    }
    while (height < 1 || height > 8);

    for (int i = 0; i < height; i++)
    {
        int spaces = height - i - 1;
        int hashes = height - spaces;

        for (int j = 0; j < spaces; j++)
        {
            printf(" ");
        }

        for (int j = 0; j < hashes; j++)
        {
            printf("#");
        }

        printf("\n");
    }
}