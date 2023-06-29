#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

const int FIRST_UPPERCASE_LETTER = 'A';
const int FIRST_LOWERCASE_LETTER = 'a';
const int ALPHABET_LENGTH = 26;

bool validateTwoArguments(int number);
bool validateKey(string key);
string encrypting(string text, string key);

int main(int argc, string argv[])
{
    string key = argv[1];

    if (!validateTwoArguments(argc) || !validateKey(key)) {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    string text = get_string("plaintext: ");
    string encryptedText = encrypting(text, key);

    printf("Your text is %s, your encrypted text is %s\n", text, encryptedText);

    return 0;
}

bool validateTwoArguments(int number) {
    return number == 2;
}

bool validateKey(string key) {
    for (int i = 0, length = strlen(key); i < length; i++)
    {
        if (!isalpha(key[i]))
        {
            return false;
        }
    }

    return true;
}


int shift(char c, string key)
{
    int keyLength = strlen(key);
    int index = c % keyLength;
    char letter = key[index];

    if (isupper(key[index]))
    {
        return key[index] - FIRST_UPPERCASE_LETTER;
    }
    else
    {
        return key[index] - FIRST_LOWERCASE_LETTER;
    }
}

char getNewSymbol(char letter, int step) {
    int firstLetter = isupper(letter) ? FIRST_UPPERCASE_LETTER : FIRST_LOWERCASE_LETTER;

    int decimal = letter - firstLetter;
    int newDecimal = (decimal + step) % ALPHABET_LENGTH;
    char newSymbol = newDecimal + firstLetter;

    return newSymbol;
}

string encrypting(string text, string key) {
    int length = strlen(text);
    int counter = 0;
    string encryptedText = malloc((length + 1) * sizeof(char));

    for (int i = 0; i < length; i++) {
        char currentSymbol = text[i];

        if (isalpha(currentSymbol))
        {
            int step = shift(counter, key);
            char newSymbol = getNewSymbol(currentSymbol, step);

            encryptedText[i] = newSymbol;

            counter++;
        }
        else
        {
            encryptedText[i] = currentSymbol;
        }
    }

    encryptedText[length] = '\0';

    return encryptedText;
}
