import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { DataSource } from 'typeorm';
import { Character } from './entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(private dataSource: DataSource) {}
  async create(createCharacterDto: CreateCharacterDto) {
    const characterRepo = this.dataSource.getRepository(Character);
    const newCharacter = new Character();
    newCharacter.name = createCharacterDto.name;
    newCharacter.experience = createCharacterDto.experience;
    await characterRepo.save(newCharacter);
    // return 'This action adds a new character';
  }

  async findAll() {
    return await this.dataSource.getRepository(Character).find();
    // return `This action returns all character`;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const characterRepo = this.dataSource.getRepository(Character);
    const characterToUpdate = await characterRepo.findOneBy({ id });

    if (!characterToUpdate) {
      throw new BadRequestException('Ilyen id-val  nem található karakter');
    }
    if (
      updateCharacterDto.name == null &&
      updateCharacterDto.experience == null
    ) {
      throw new BadRequestException('A kéréshez nem társul semmilyen adat');
    }
    characterToUpdate.experience = updateCharacterDto.experience;
    characterToUpdate.name = updateCharacterDto.name;

    characterRepo.save(characterToUpdate);
    // return `This action updates a #${id} character`;
  }

  async remove(id: number) {
    const charaterRepo = this.dataSource.getRepository(Character);
    const charaterDelete = await charaterRepo.findOneBy({ id });
    if (charaterDelete == null) {
      throw new BadRequestException();
    }
    await charaterRepo.delete({ id: id });
    // return `This action removes a #${id} character`;
  }
}
