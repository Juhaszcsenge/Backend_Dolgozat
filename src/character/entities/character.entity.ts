import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from '../../player/entities/player.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ default: 0 })
  experience: number;

  @ManyToOne(() => Player, (player) => player.characters, {
    onDelete: 'CASCADE',
  })
  player: Player;
}
