#define _XOPEN_SOURCE
#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

const int MAX_PASSWORD_LENGTH = 5;

void generatePassword(string password, string hash, int length);

// 51.xJagtPnb6s -- TF
// 50nU3ZCIEHcC2 -- qwert
int main(int argc, string argv[])
{
    if (argc != 2) {
        printf("Usage: ./crack hash\n");
        return 1;
    }

    char password[MAX_PASSWORD_LENGTH];
    string hash = argv[1];

    for (int length = 1; length <= MAX_PASSWORD_LENGTH; length++)
    {
        generatePassword(password, hash, length);
    }

    printf("Password not found.\n");
    return 1;
}

string getSalt(string hash)
{
    string salt = malloc(3 * sizeof(char));;
    strncpy(salt, hash, 2);

    return salt;
}

void generatePassword(string password, string hash, int length)
{
    if (length == 0)
    {
        string salt = getSalt(hash);
        string hashed_password = crypt(password, salt);

        if (strcmp(hashed_password, hash) == 0)
        {
            printf("%s\n", password);
            exit(0);
        }
    }
    else
    {
        for (int letter = 'A'; letter <= 'z'; letter++)
        {
            password[length - 1] = letter;
            generatePassword(password, hash, length - 1);
        }
    }
}
