import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../../character/entities/character.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({ default: false })
  banned: boolean;

  @OneToMany(() => Character, (character) => character.player)
  characters: Character[];
}
