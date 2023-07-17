// Resize a BMP file

#include <stdio.h>
#include <stdlib.h>

#include "bmp.h"

int main(int argc, char *argv[])
{
    // ensure proper usage
    if (argc != 4)
    {
        fprintf(stderr, "Usage: ./resize n infile outfile\n");
        return 1;
    }

    // magnification factor of the image
    int factor = atoi(argv[1]);

    if (factor < 1 || factor > 100)
    {
        fprintf(stderr, "Usage: ./resize n infile outfile\n");
        return 1;
    }

    // remember filenames
    char *infile = argv[2];
    char *outfile = argv[3];

    // open input file
    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        fprintf(stderr, "Could not open %s.\n", infile);
        return 2;
    }

    // open output file
    FILE *outptr = fopen(outfile, "w");
    if (outptr == NULL)
    {
        fclose(inptr);
        fprintf(stderr, "Could not create %s.\n", outfile);
        return 3;
    }

    // read infile's BITMAPFILEHEADER
    BITMAPFILEHEADER bf;
    fread(&bf, sizeof(BITMAPFILEHEADER), 1, inptr);

    // read infile's BITMAPINFOHEADER
    BITMAPINFOHEADER bi;
    fread(&bi, sizeof(BITMAPINFOHEADER), 1, inptr);

    // ensure infile is (likely) a 24-bit uncompressed BMP 4.0
    if (bf.bfType != 0x4d42 || bf.bfOffBits != 54 || bi.biSize != 40 ||
        bi.biBitCount != 24 || bi.biCompression != 0)
    {
        fclose(outptr);
        fclose(inptr);
        fprintf(stderr, "Unsupported file format.\n");
        return 4;
    }

    // calculate new sizes
    int newWidth = bi.biWidth * factor;
    int newHeight = abs(bi.biHeight) * factor;
    int padding = (4 - (bi.biWidth * sizeof(RGBTRIPLE)) % 4) % 4;
    int newPadding = (4 - (bi.biWidth * factor * sizeof(RGBTRIPLE)) % 4) % 4;

    // determine new padding for scanlines
    int newSize = (newWidth * newHeight + padding) * 3;

    // update bfSize
    // bf.bfSize = bf.bfSize - 54 * newSize;
    int oldWidth = bi.biWidth;
    int oldHeight = bi.biWidth;
    bi.biWidth = newWidth;
    bi.biHeight = -newHeight;

    // write outfile's BITMAPFILEHEADER
    fwrite(&bf, sizeof(BITMAPFILEHEADER), 1, outptr);

    // write outfile's BITMAPINFOHEADER
    fwrite(&bi, sizeof(BITMAPINFOHEADER), 1, outptr);

    // iterate over infile's scanlines
    for (int rowIndex = 0, biHeight = abs(oldHeight); rowIndex < biHeight; rowIndex++)
    {
        RGBTRIPLE row[newWidth];

        // iterate over pixels in scanline
        for (int cellIndex = 0; cellIndex < oldWidth; cellIndex++)
        {
            // temporary storage
            RGBTRIPLE triple;

            // read RGB triple from infile
            fread(&triple, sizeof(RGBTRIPLE), 1, inptr);

            // write factored data in row
            for (int i = 0; i < factor; i++)
            {
                row[cellIndex * factor + i] = triple;
            }
        }

        // write in new file factored rows
        for (int j = 0; j < factor; j++)
        {
            // write RGB triple to outfile
            fwrite(row, sizeof(RGBTRIPLE), newWidth, outptr);
        }

        // skip over padding, if any
        fseek(inptr, padding, SEEK_CUR);

        // then add it back (to demonstrate how)
        for (int k = 0; k < newPadding; k++)
        {
            fputc(0x00, outptr);
        }
    }

    // close infile
    fclose(inptr);

    // close outfile
    fclose(outptr);

    // success
    return 0;
}