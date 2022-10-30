import { IsInt, IsNumber, IsString } from 'class-validator';
import { BoardEntity } from 'src/api/board/infrastructure/board.entity';
import { TypeOrmBaseEntity } from 'src/api/common/model/typeorm-entity.base';
import { UserEntity } from 'src/api/user/infrastructure/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export const PostErrorMessage = {
  title: '잘못된 제목입니다.',
  content: '잘못된 내용입니다.',
  board: '잘못된 게시판 정보입니다.',
  writer: '잘못된 사용자 정보입니다.',
};

@Entity({ name: 'posts' })
export class PostEntity extends TypeOrmBaseEntity {
  @Column()
  @IsString({ message: PostErrorMessage.title })
  title: string;

  @Column({ nullable: true })
  @IsNumber({}, { message: PostErrorMessage.writer })
  writer_id: number | null;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'writer_id' })
  writer: UserEntity | null;

  @Column()
  @IsNumber({}, { message: PostErrorMessage.board })
  board_id: number;

  @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity;

  @Column({ default: 0 })
  @IsInt()
  views: number;

  @Column()
  @IsString({ message: PostErrorMessage.content })
  content: string;
}
