import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AppRole } from 'src/utils/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 'uuid' })
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({ example: 'john@example.com' })
  @Column({ unique: true })
  email?: string;

  @Exclude()
  @Column({ select: false })
  password?: string;

  @Exclude()
  @Column({ enum: AppRole, select: false })
  role?: AppRole;

  @ApiProperty({ example: true })
  @Column({ nullable: true })
  emailVerified?: boolean;

  @Exclude()
  @Column({ nullable: true, select: false })
  verifyToken?: string;

  @ApiProperty({ example: ['expoToken1', 'expoToken2'] })
  @Column({ type: 'simple-array', nullable: true })
  expoTokens?: string[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @ApiProperty({ example: 'profile-uuid' })
  @Index()
  @Column({ nullable: true })
  profileId?: string;

  // Relation เผื่อไว้
  // @ApiProperty({ type: () => Profile })
  // @OneToOne(() => Profile, profile => profile.user)
  // profile?: Profile;
}
