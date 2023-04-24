import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { AppService } from './app.service';
import { Character } from './character/entities/character.entity';

interface transBody {
  amount: number;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Post('/character/:id/earnxp')
  async characterXp(@Param('id') id: number, @Body() xp: transBody) {
    const characterRepo = this.dataSource.getRepository(Character);
    console.log(id + ' ');
    const sourceCharacter = await characterRepo.findOneBy({ id: id });
    console.log(sourceCharacter);
    if (!xp.amount) {
      throw new NotFoundException('nem');
    }
    if (sourceCharacter == null) {
      throw new NotFoundException();
    }
    const sourceCharaterExperience = sourceCharacter.experience + xp.amount;
    console.log(sourceCharaterExperience);
    if (sourceCharaterExperience < 0) {
      throw new ConflictException('Nincs Xp-je');
    }
    sourceCharacter.experience += xp.amount;
    characterRepo.save(sourceCharacter);
  }
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
}
