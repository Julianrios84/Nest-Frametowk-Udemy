import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  getStaticImage(directory: string, imageName: string) {
    const path = join(__dirname, `../../static/${directory}`, imageName);

    if (!existsSync(path))
      throw new BadRequestException(
        `No product found with image: ${imageName}`,
      );

    return path;
  }
}
