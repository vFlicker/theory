#include <cs50.h>
#include <stdio.h>

void printPyramid(int height);

int main(void)
{
    int height;

    do
    {
        height = get_int("Enter hight of pyramid: ");
    }
    while (height < 1 || height > 8);

    printPyramid(height);
}

void printSpaces(int spaces)
{
    for (int j = 0; j < spaces; j++)
    {
        printf(" ");
    }
}

void printHashes(int hashes)
{
    for (int j = 0; j < hashes; j++)
    {
        printf("#");
    }
}

void printPyramid(int height)
{
    for (int i = 0; i < height; i++)
    {
        int leftSpaces = height - i - 1;
        int rightSpaces = 0;
        int hashes = height - leftSpaces;

        printSpaces(leftSpaces);
        printHashes(hashes);

        printf(" ");

        printSpaces(0);
        printHashes(hashes);

        printf("\n");
    }
}