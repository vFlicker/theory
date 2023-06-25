#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>

const string VISA = "VISA";
const string AMEX = "AMEX";
const string MASTERCARD = "MASTERCARD";

bool checkCorrectCardLength(long number);
bool validationOfLuhn(long number);
string getCardName(long number);

int main(void)
{
    long number = get_long("Number: ");

    bool isLengthCorrect = checkCorrectCardLength(number);
    bool isCorrectNumber = validationOfLuhn(number);

    if (isLengthCorrect == false || isCorrectNumber == false) {
        printf("INVALID\n");
    }
    else
    {
        string cardName = getCardName(number);

        if (cardName[0] == '\0')
        {
            printf("INVALID\n");
        }
        else
        {
            printf("%s\n", cardName);
        }
    }
}

bool checkCorrectCardLength(long number)
{
    char numberStr[16];
    int length = sprintf(numberStr, "%ld", number);

    if (length == 13 || length == 15 || length == 16)
    {
        return true;
    }

    return false;
}

bool validationOfLuhn(long number)
{
    int total = 0;
    char numberStr[16];
    int length = sprintf(numberStr, "%ld", number);

    for (int i = length - 2; i >= 0; i -= 2)
    {
        int currentNumber = (numberStr[i] - '0') * 2;

        if (currentNumber > 9) {
            total += round(currentNumber / 10);
            total += currentNumber % 10;
        }
        else
        {
            total += currentNumber;
        }
    }

    for (int i = length - 1; i >= 0; i -= 2)
    {
        int currentNumber = (numberStr[i] - '0');
        total += currentNumber;
    }

    if (total % 10 != 0)
    {
        return false;
    }
 
    return true;
}

string getCardName(long number)
{
    char numberStr[16];

    sprintf(numberStr, "%ld", number);

    char firstNumber = numberStr[0];
    char twoFirstNumbers[3];

    twoFirstNumbers[0] = numberStr[0];
    twoFirstNumbers[1] = numberStr[1];
    twoFirstNumbers[2] = '\0';

    if (firstNumber == '4')
    {
        return VISA;
    }

    if (
        strcmp(twoFirstNumbers, "34") == 0
        || strcmp(twoFirstNumbers, "37") == 0
    )
    {
        return AMEX;
    }

    if (
        strcmp(twoFirstNumbers, "51") == 0
        || strcmp(twoFirstNumbers, "52") == 0
        || strcmp(twoFirstNumbers, "53") == 0
        || strcmp(twoFirstNumbers, "54") == 0
        || strcmp(twoFirstNumbers, "55") == 0
    )
    {
        return MASTERCARD;
    }

    return "";
}
