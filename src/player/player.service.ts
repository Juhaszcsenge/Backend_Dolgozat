import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { DataSource } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(private dataSource: DataSource) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const playerRepo = this.dataSource.getRepository(Player);
    const newPlayer = new Player();
    newPlayer.email = createPlayerDto.email;
    newPlayer.banned = createPlayerDto.banned;
    await playerRepo.save(newPlayer);
    // return 'This action adds a new player';
  }

  async findAll() {
    // return `This action returns all player`;
    return await this.dataSource.getRepository(Player).find();
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    const playerRepo = this.dataSource.getRepository(Player);
    const playerToUpdate = await playerRepo.findOneBy({ id });

    if (!playerToUpdate) {
      throw new BadRequestException('Ilyen id-val nem található játékos');
    }
    if (updatePlayerDto.email == null && updatePlayerDto.banned == null) {
      throw new BadRequestException(
        'A kéréshez nem társult semilyen email cím',
      );
    }
    playerToUpdate.email = updatePlayerDto.email;
    playerToUpdate.banned = updatePlayerDto.banned;

    playerRepo.save(playerToUpdate);
    // return `This action updates a #${id} player`;
  }

  async remove(id: number) {
    // return `This action removes a #${id} player`;
    const playerRepo = this.dataSource.getRepository(Player);
    const playerToDelete = await playerRepo.findOneBy({ id });
    if (playerToDelete == null) {
      throw new BadRequestException();
    }
    return await playerRepo.delete({ id: id });
  }
}
