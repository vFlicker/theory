#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    // ensure proper usage
    if (argc != 2)
    {
        fprintf(stderr, "Usage: ./recover image\n");
        return 1;
    }

    char *infile = argv[1];

    // open input file
    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        fprintf(stderr, "Could not open %s\n", infile);
        return 2;
    }

    unsigned char buffer[512];
    int foundFiles = 0;
    char filename[8];
    FILE *img = NULL;

    // until we reached the end of memory
    while (fread(buffer, 512, 1, inptr) == 1)
    {
        bool isJPEGHeader = buffer[0] == 0xff
            && buffer[1] == 0xd8
            && buffer[2] == 0xff
            && (buffer[3] & 0xf0) == 0xe0;

        if (isJPEGHeader) {
            foundFiles += 1;

            if (img != NULL)
            {
                fclose(img);
            }

            sprintf(filename, "%03i.jpg", foundFiles);
            img = fopen(filename, "w");
            fwrite(&buffer, 512, 1, img);
        }
        else
        {
            if (foundFiles > 0)
            {
                fwrite(&buffer, 512, 1, img);
            }
        }
    }

    // close input file
    fclose(inptr);

    // return status OK
    return 0;
}
